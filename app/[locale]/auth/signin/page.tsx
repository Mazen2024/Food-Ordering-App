import MainHeading from "@/components/main-heading";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
// import Form from "./_components/Form";
import getTrans from "@/lib/translation";
import Custom_Link from "@/components/customlink";
import { Pages, Routes } from "@/contants/enums";
import Form from "./_components/Form";
import useFormFields from "@/hooks/useFormFields";

const LoginPage = async () => {
  const locale = await getCurrentLocale();

  const translations = await getTrans(locale);

  const createFormFields = await useFormFields({
    slug: `${Routes.AUTH}/${Pages.LOGIN}`,
    trans: translations,
  });

  // console.log(createFormFields);

  return (
    <main className="min-h-[85vh]">
      <section className="container">
        <div className="text-center mb-6">
          <MainHeading title={translations.auth.login.title} subtitle="" />
        </div>
        <div className="py-44 md:py-40 bg-gray-50 element-center">
          <div className="container element-center">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
              <Form
                createFormFields={createFormFields}
                translations={translations}
              />
              <p className="mt-2 flex items-center justify-center text-accent text-sm">
                <span className="text-blue-700 font-semibold">
                  {translations.auth.login.authPrompt.message}
                </span>
                <Custom_Link
                  href={`/${locale}${Routes.AUTH}/${Pages.REGISTER}`}
                  className={`${buttonVariants({
                    variant: "link",
                    size: "sm",
                  })} text-primary! font-bold!`}
                >
                  {translations.auth.login.authPrompt.signUpLinkText}
                </Custom_Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
