"use client";
import { InputTypes, Routes, UserRole } from "@/contants/enums";
import { Users } from "@/lib/generated/prisma/client";
import { FormField } from "@/lib/types/app";
import { Translations } from "@/lib/types/Translations";
import Image from "next/image";
import FormFields from "../auth/FormFields";
import { Button } from "../ui/button";
import CheckBoxField from "../auth/CheckBoxField";
import { useActionState, useEffect, useState } from "react";
import { validationErrors } from "@/validations/authvalidations";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Locale } from "@/i18n.config";
import { CameraIcon } from "lucide-react";
import { UpdateProfileLogic } from "@/Server/_actions/Profile/profileactions";

const initialState: {
  message?: string;
  error?: validationErrors;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

const EditUserForm = ({
  user,
  trans,
  createFormFields,
  locale,
}: {
  user: Users | any;
  trans: Translations;
  createFormFields: FormField[];
  locale: Locale;
}) => {
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);

  const [selectedImage, setSelectedImage] = useState(user.image ?? "/assets/images/NO.png");

  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const [state, action, isPending] = useActionState(
    UpdateProfileLogic,
    initialState,
  );

  // console.log(user);

  useEffect(() => {
    if (state && state.status && state.message) {
      if (state.status === 200) {
        toast.success(state.message, {
          className: "text-green-400! border-3! font-bold!",
        });
        setSelectedImage(user.image as string)
      } else {
        toast.error(state.message, {
          className: "text-destructive! border-3! font-bold!",
        });
      }
    }
  }, [locale, state.status, state.message, isPending, user.image]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10 mt-10">
      <div className="group relative w-50 h-50 rounded-full">
        <Image
          src={selectedImage}
          alt="Prfile-Img"
          width={200}
          height={200}
          className="object-cover rounded-full"
          loading="eager"
        />
        <div
          className=" bg-gray-50/40 flex items-center justify-center my-8"
        >
          <UploadImage setSelectedImage={setSelectedImage} />
        </div>
      </div>
      <div className="flex-1">
        {createFormFields.map((item: FormField) => {
          /// Fetch Field Value To Be Default
          const fieldValue =
            state?.formData?.get(item.name) ?? formData.get(item.name);
          return (
            <div key={item.name} className="mb-6">
              <FormFields
                {...item}
                error={state?.error}
                defaultvalue={fieldValue as string}
                readonly={item.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}

        {/* In Case Admin User =====> Checkbox */}
        {user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2 my-4">
            <CheckBoxField
              id="is-admin"
              checked={isAdmin}
              name="admin"
              error={{}}
              type="checkbox"
              onClick={() => setIsAdmin(!isAdmin)}
            />
            <label htmlFor="is-admin" className="text-sm">
              Admin
            </label>
          </div>
        )}
        <Button
          disabled={isPending}
          type="submit"
          className="w-full cursor-pointer font-semibold mt-4 mb-2"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner data-icon="inline-start" />
              <Spinner data-icon="inline-start" />
              <Spinner data-icon="inline-start" />
            </div>
          ) : (
            trans.save
          )}
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;

export const UploadImage = ({
  setSelectedImage,
}: {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ImageFile = e.target.files && e.target.files[0];

    if (ImageFile) {
      const ImageFileURL = URL.createObjectURL(ImageFile);
      // console.log(ImageFileURL);
      setSelectedImage(ImageFileURL);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="images/*"
        className="hidden"
        id="img-upload"
        name="image"
        onChange={handleImageChange}
      />
      <label
        htmlFor="img-upload"
        className="border rounded-full w-[50] h-[50] element-center cursor-pointer"
      >
        <CameraIcon className="w-10! h-10! text-gray-500" />
      </label>
    </>
  );
};
