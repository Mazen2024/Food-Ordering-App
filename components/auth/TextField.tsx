import { FormField } from "@/lib/types/app";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { validationErrors } from "@/validations/authvalidations";

interface Props extends FormField {
  error: validationErrors;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autofocus,
  error,
  defaultvalue,
  readonly,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="capitalize text-black mb-2 md:mb-4">
        {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autofocus}
        name={name}
        id={name}
        defaultValue={defaultvalue}
        readOnly={readonly}
      />
      {error && error[name] && (
        <p
          className={`text-accent mt-2 text-sm font-medium ${
            error[name] ? "text-destructive" : ""
          }`}
        >
          {error[name]}
        </p>
      )}
    </div>
  );
};

export default TextField;
