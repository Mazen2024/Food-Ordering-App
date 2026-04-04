import { Locale } from "@/i18n.config";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  return <div className="min-h-[90vh] container">ProfilePage</div>;
};

export default ProfilePage;
