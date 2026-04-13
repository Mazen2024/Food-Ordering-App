import { Label } from "../ui/label";
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";
import { FormField } from "@/lib/types/app";
import { validationErrors } from "@/validations/authvalidations";

interface Props extends FormField {
  error: validationErrors;
}

interface Props {
  onClick?: () => void;
  checked?: boolean;
  label?: FormField["label"];
  name: FormField["name"];
  id: FormField["id"];
}

const CheckBoxField = ({ label, id, name, checked, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <ShadcnCheckbox
        type="button"
        id={id}
        name={name}
        onClick={onClick}
        checked={checked}
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default CheckBoxField;
