"use client";
import FormFields from "@/components/auth/FormFields";
import { Button } from "@/components/ui/button";
import { FormField } from "@/lib/types/app";
import { Translations } from "@/lib/types/Translations";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Pages, Routes } from "@/contants/enums";
import { useParams, useRouter } from "next/navigation";

const Form = ({
  createFormFields,
  translations,
}: {
  createFormFields: FormField[];
  translations: Translations;
}) => {
  /// Reference To Form To Fetch Input Values
  const FormRef = useRef<HTMLFormElement>(null);

  const [errorMessageBelowInput, setError] = useState({});

  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const {locale} = useParams()

  //// Handle Submit Event
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    /// Case : Null Values
    if (!FormRef.current) return;

    //// Case : Existing Values
    const formdata = new FormData(FormRef.current);

    let inputsData: Record<string, string> = {};

    //// Populate Data With Entries
    formdata.forEach((value, key) => {
      inputsData[key] = value.toString();
    });

    // console.log(inputsData);

    try {
      setLoading(true);
      /// Call NextAuth Sign IN Method
      const res = await signIn("credentials", {
        email: inputsData.email,
        password: inputsData.password,
        redirect: false,
      });
      if (res?.error) {
        /// Parse Validation Error
        const parsedValidationError = JSON.parse(res.error).validationErrors;
        /// Set State For Error Message Below Input
        setError(parsedValidationError);

        /// Parse DB Error
        const parsedResponseError = JSON.parse(res.error).responseErrors;

        if (parsedResponseError) {
          toast.error(parsedResponseError, {
            className: "text-destructive! border-3! font-bold!",
          });
        }
      }

      /// Case Suucessful Login
      if (res?.ok) {
        toast.success(translations.messages.loginSuccessful, {
          className: "text-green-400! border-3! font-bold!",
        });
        router.replace(`/${locale}${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={FormRef}>
      {createFormFields.map((item: FormField) => (
        <div key={item.name} className="mb-6">
          <FormFields {...item} error={errorMessageBelowInput} />
        </div>
      ))}
      <Button
        disabled={loading}
        type="submit"
        className="w-full cursor-pointer font-semibold"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner data-icon="inline-start" />
            <Spinner data-icon="inline-start" />
            <Spinner data-icon="inline-start" />
          </div>
        ) : (
          translations.auth.login.submit
        )}
      </Button>
    </form>
  );
};

export default Form;
