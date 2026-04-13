import EditUserForm from "@/components/edit-user-form";
import MainHeading from "@/components/main-heading";
import { Routes } from "@/contants/enums";
import { useClientSession } from "@/hooks/useClientSession";
import useFormFields from "@/hooks/useFormFields";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/Server/DB/Auth";
import { getServerSession } from "next-auth";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  const session = await getServerSession(authOptions);

  const trans = await getTrans(locale);

  const createFormFields = await useFormFields({
    slug: `${Routes.PROFILE}`,
    trans: trans,
  });

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="text-center mx-auto">
            <MainHeading title={trans.profile.title} subtitle="" />
          </div>
          <EditUserForm
            user={session?.user}
            trans={trans}
            createFormFields={createFormFields}
            locale={locale}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
