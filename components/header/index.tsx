import { Routes } from "@/contants/enums";
import Custom_Link from "../customlink";
import NavBar from "./NavBar";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";

const Header = async () => {
  const locale = await getCurrentLocale();

  const { logo, navbar } = await getTrans(locale);

  return (
    <header className="py-4 md:py-6">
      <div className="container flex justify-between items-center">
        <Custom_Link
          className="text-2xl text-primary font-semibold"
          href={`/${locale}`}
        >
          🍕 {logo}
        </Custom_Link>
        <NavBar trans={navbar} locale={locale} />
      </div>
    </header>
  );
};

export default Header;
