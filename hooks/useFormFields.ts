import { Pages, Routes } from "@/contants/enums";
import { FormField, FormVariables } from "@/lib/types/app";
import { Translations } from "@/lib/types/Translations";

interface Props extends FormVariables {
  trans: Translations;
}

/// Create Form Inputs Based On Slug
const useFormFields = async ({ slug, trans }: Props) => {
  //// Create Login Inputs Function
  const loginFields = (): FormField[] => {
    return [
      {
        label: trans.auth.login.email.label,
        name: "email",
        type: "email",
        placeholder: trans.auth.login.email.placeholder,
        autofocus: true,
      },
      {
        label: trans.auth.login.password.label,
        name: "password",
        type: "password",
        placeholder: trans.auth.login.password.placeholder,
      },
    ];
  };

  //// Create Sign Up Inputs Function
  const signUpFields = (): FormField[] => {
    return [
      {
        label: trans.auth.register.name.label,
        name: "name",
        type: "text",
        placeholder: trans.auth.register.name.placeholder,
        autofocus: true,
      },
      {
        label: trans.auth.register.email.label,
        name: "email",
        type: "email",
        placeholder: trans.auth.register.email.placeholder,
      },
      {
        label: trans.auth.register.password.label,
        name: "password",
        type: "password",
        placeholder: trans.auth.register.password.placeholder,
      },
      {
        label: trans.auth.register.confirmPassword.label,
        name: "confirmpassword",
        type: "password",
        placeholder: trans.auth.register.confirmPassword.placeholder,
      },
    ];
  };

  /// Switching For Route
  const createFormFields = (): FormField[] => {
    switch (slug) {
      case `${Routes.AUTH}/${Pages.LOGIN}`:
        return loginFields();
      case `${Routes.AUTH}/${Pages.REGISTER}`:
        return signUpFields();
      default:
        return [];
    }
  };

  return createFormFields();
};

export default useFormFields;
