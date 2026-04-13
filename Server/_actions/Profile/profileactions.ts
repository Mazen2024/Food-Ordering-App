"use server";
import { Routes } from "@/contants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { prismaObj } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { UpdateProfileSchema } from "@/validations/authvalidations";
import { revalidatePath } from "next/cache";

//// Update Profile Logic Server Action
export const UpdateProfileLogic = async (
  prevState: unknown,
  formData: FormData,
) => {
  const locale = await getCurrentLocale();

  /// Detect Dictionaries
  const translate = await getTrans(locale);

  /// Update Profile Schema Validations
  const result = UpdateProfileSchema(translate).safeParse(
    Object.fromEntries(formData.entries()),
  );

  /// Case Of Zod Validations Errors
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      formData,
      status: 400,
    };
  }

  const imageFile = result.data.image as File;
  // In Case Size > 0 Upload & Return URL
  const imageURL = Boolean(imageFile.size)
    ? await getImageURL(imageFile)
    : undefined;

//   console.log(imageURL);

  try {
    /// Fetch User From DB Via Email
    const user = await prismaObj.users.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (!user) {
      return {
        message: translate.messages.userNotFound,
        formData,
        status: 401,
      };
    }

    //// Update Data Row
    await prismaObj.users.update({
      where: { email: user.email },
      data: { ...result.data, image: imageURL ?? user.image },
    });

    revalidatePath(`${locale}${Routes.PROFILE}`);
    revalidatePath(`${locale}${Routes.ADMIN}`);

    return {
      status: 200,
      message: translate.messages.updateProfileSucess,
    };
  } catch (error) {
    // console.log(error);
    return {
      message: translate.messages.unexpectedError,
      status: 500,
    };
  }
};

//// Function For Get Cloudinary Image URL
const getImageURL = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("pathName", "Profile_Images");

  try {
    /// Call EndPoint API Server Side
    const response = await fetch(
      `${process.env["NEXT_PUBLIC_BASE_URL"]}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const image = (await response.json()) as { url: string };    
    return image.url;
  } catch (error) {
    console.log("Error Uploaing File To Cloudinary", error);
  }
};
