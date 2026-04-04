"use client";
import FormFields from "@/components/auth/FormFields";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Pages, Routes } from "@/contants/enums";
import { Locale } from "@/i18n.config";
import { FormField } from "@/lib/types/app";
import { Translations } from "@/lib/types/Translations";
import { signUpLogic } from "@/Server/_actions/Auth/authactions";
import { validationErrors } from "@/validations/authvalidations";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const Form = ({
  createFormFields,
  translations,
  locale,
}: {
  createFormFields: FormField[];
  translations: Translations;
  locale: Locale;
}) => {
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

  const [state, action, isPending] = useActionState(signUpLogic, initialState);

  const router = useRouter();

  useEffect(() => {
    if (state.status && state.message) {
      if (state.status === 201) {
        toast.success(state.message, {
          className: "text-green-400! border-3! font-bold!",
        });
        /// Redirect To Login Page In Case Of Successful Sign Up
        router.replace(`/${locale}${Routes.AUTH}/${Pages.LOGIN}`);
      } else {
        toast.error(state.message, {
          className: "text-destructive! border-3! font-bold!",
        });
      }
    }
  }, [locale, router, state.status, state.message]);

  return (
    <form action={action}>
      {createFormFields.map((item: FormField) => {
        /// Fetch Field Value To Be Default
        const fieldValue = state.formData?.get(item.name);
        return (
          <div key={item.name} className="mb-6">
            <FormFields
              {...item}
              error={state.error}
              defaultvalue={fieldValue?.toString()}
            />
          </div>
        );
      })}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer font-semibold mt-4 mb-2"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner data-icon="inline-start" />
            <Spinner data-icon="inline-start" />
            <Spinner data-icon="inline-start" />
          </div>
        ) : (
          translations.auth.register.submit
        )}
      </Button>
    </form>
  );
};

export default Form;
