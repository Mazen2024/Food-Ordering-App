import Custom_Link from "../customlink";
import NavBar from "./NavBar";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import LanguageSwitcher from "./language-switcher";
import CartButtons from "./CartButtons";
import AuthButtons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Server/DB/Auth";

const Header = async () => {
  const locale = await getCurrentLocale();

  const translation = await getTrans(locale);

  const initialSession = await getServerSession(authOptions);

  // console.log(initialSession);  

  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-8">
        <Custom_Link
          className="text-2xl text-primary font-semibold"
          href={`/${locale}`}
        >
          🍕 {translation.logo}
        </Custom_Link>
        <NavBar
          trans={translation}
          locale={locale}
          initialSession={initialSession}
        />
        <div className="flex justify-end flex-1 items-center gap-6">
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <AuthButtons
              translation={translation}
              locale={locale}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>
          <CartButtons locale={locale} />
        </div>
      </div>
    </header>
  );
};

export default Header;
