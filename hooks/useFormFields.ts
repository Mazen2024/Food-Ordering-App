import { Pages, Routes } from "@/contants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { FormField, FormVariables } from "@/lib/types/app";

interface Props extends FormVariables {
  trans: any;
}

/// Create Form Inputs Based On Slug
const useFormFields = async ({ slug, trans }: Props) => {

  //// Create Login Inputs Function
  const loginFields = (): FormField[] => {
    return [
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Enter Your Email",
        autofocus: true,
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        placeholder: "Enter Your password",
      },
    ];
  };

  /// Switching For Route
  const createFormFields = (): FormField[] => {
    switch (slug) {
      case `${Routes.AUTH}/${Pages.LOGIN}`:
        return loginFields();
      default:
        return [];
    }
  };

  return createFormFields();
};

export default useFormFields;
