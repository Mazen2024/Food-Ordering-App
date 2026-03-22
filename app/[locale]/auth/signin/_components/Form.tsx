import FormFields from "@/components/auth/FormFields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/contants/enums";
import useFormFields from "@/hooks/useFormFields";
import { FormField } from "@/lib/types/app";

const Form = async ({ translations }: { translations: any }) => {
  const createFormFields = await useFormFields({
    slug: `${Routes.AUTH}/${Pages.LOGIN}`,
    trans: {},
  });

  // console.log(createFormFields);

  return (
    <form>
      {createFormFields.map((item: FormField) => (
        <div key={item.name} className="mb-6">
          <FormFields {...item} />
        </div>
      ))}
      <Button type="submit" className="w-full cursor-pointer font-semibold">
        {translations.auth.login.submit}
      </Button>
    </form>
  );
};

export default Form;
