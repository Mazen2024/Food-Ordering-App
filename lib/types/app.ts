// Define Form Field Input
export interface FormField {
  label?: string;
  name: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "checkbox"
    | "time"
    | "radio";
  placeholder?: string;
  disabled?: boolean;
  autofocus?: boolean;
  defaultvalue?: string;
  readonly?: boolean;
  id?: string;
  checked?: boolean;
}

//// Define Route For Login Or SignUp
export interface FormVariables {
  slug: string;
}
