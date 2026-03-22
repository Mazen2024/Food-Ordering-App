"use client"
import { Button } from "@/components/ui/button";

const Form = ({ translations }: { translations: any }) => {
  return (
    <form>
      <Button type="submit" className="w-full cursor-pointer font-semibold">
        {translations.auth.register.submit}
      </Button>
    </form>
  );
};


export default Form;
