"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Languages } from "@/contants/enums";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex mx-2 md:mx-4">
      {locale === Languages.ARABIC ? (
        <Button
          className="cursor-pointer hover:bg-primary hover:text-white font-semibold duration-200 ease-in-out transition-all"
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          className="cursor-pointer hover:bg-primary  hover:text-white font-semibold duration-200 ease-in-out transition-all"
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
