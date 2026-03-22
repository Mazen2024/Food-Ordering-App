"use client"
import { FormField } from "@/lib/types/app";
import PasswordField from "./PasswordField";
import { InputTypes } from "@/contants/enums";
import TextField from "./TextField";
// import { ValidationErrors } from "@/validations/auth";

interface Props extends FormField {
    // error: any;
}

const FormFields = (props: Props) => {
  const { type } = props;
  const renderField = (): React.ReactNode => {
    if (type === InputTypes.EMAIL || type === InputTypes.TEXT) {
      return <TextField {...props} />;
    }

    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    // if (type === InputTypes.CHECKBOX) {
    //   return <CheckBoxField {...props} />;
    // }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
