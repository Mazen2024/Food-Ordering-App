"use server";
import { Locale } from "@/i18n.config";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { prismaObj } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { loginSchema, signUpSchema } from "@/validations/authvalidations";
import bcrypt from "bcrypt";

//// Login Logic Server Action
export const loginLogic = async (
  credentials: Record<"email" | "password", string> | undefined,
  locale: Locale,
) => {
  /// Detect Dictionaries
  const translate = await getTrans(locale);

  /// Login Schema Validations
  const result = loginSchema(translate).safeParse(credentials);

  /// Case Of Zod Validations Errors
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }

  //// Connect To DB & Compare Email First
  try {
    const user = await prismaObj.users.findUnique({
      where: {
        email: result.data.email,
      },
    });

    /// Case Email Not Exist
    if (!user) {
      return { message: translate.messages.userNotFound, status: 401 };
    }

    /// Case Valid Email + Compare Password
    if (user) {
      const isValidPassword = await bcrypt.compare(
        result.data.password,
        user.password,
      );

      //// Case  Valid Email , Not Valid Password
      if (!isValidPassword) {
        return { message: translate.messages.incorrectPassword, status: 401 };
      }

      //// Case  Valid Email + Valid Password
      const { password, ...userWithoutPassword } = user;
      return {
        //// Share All User Data Except Paswword
        user: userWithoutPassword,
        message: translate.messages.loginSuccessful,
        status: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: translate.messages.unexpectedError,
      status: 500,
    };
  }
};

//// Sign Up Logic Server Action
export const signUpLogic = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();

  /// Detect Dictionaries
  const translate = await getTrans(locale);

  /// Sign Up Schema Validations
  const result = signUpSchema(translate).safeParse(
    Object.fromEntries(formData.entries()),
  );

  // console.log(result);

  /// Case Of Zod Validations Errors
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      formData,
      status: 400,
    };
  }

  try {
    const user = await prismaObj.users.findUnique({
      where: {
        email: result.data.email,
      },
    });

    /// Case Existing Email
    if (user) {
      return {
        message: translate.messages.userAlreadyExists,
        formData,
        status: 409,
      };
    }

    /// Case New User => Hash PW Then Insert To DB

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const newUser = await prismaObj.users.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    return {
      message: translate.messages.accountCreated,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      status: 201,
    };
    
  }
  
  catch (error) {
    console.log(error);
    return {
      message: translate.messages.unexpectedError,
      status: 500,
    };
  }
};
