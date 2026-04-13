"use client";
import { Directions, Languages, Routes } from "@/contants/enums";
import Custom_Link from "../customlink";
import { Button } from "../ui/button";
import { Menu, XIcon } from "lucide-react";
import { useState } from "react";
import { Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";
import AuthButtons from "./auth-buttons";
import LanguageSwitcher from "./language-switcher";
import { Translations } from "@/lib/types/Translations";
import { Session } from "next-auth";
import { UserRoles } from "@/lib/generated/prisma/enums";
import { useClientSession } from "@/hooks/useClientSession";

const NavBar = ({
  trans,
  locale,
  initialSession,
}: {
  trans: Translations;
  locale: Locale;
  initialSession: Session | null;
}) => {
  const pathName = usePathname();

  // console.log(initialSession?.user.role);

  const session = useClientSession(initialSession)

  const navItems = [
    {
      id: crypto.randomUUID(),
      name: trans.navbar.menu,
      href: `/${locale}${Routes.MENU}`,
    },
    {
      id: crypto.randomUUID(),
      name: trans.navbar.about,
      href: `/${locale}${Routes.ABOUT}`,
    },
    {
      id: crypto.randomUUID(),
      name: trans.navbar.contact,
      href: `/${locale}${Routes.CONTACT}`,
    },
    {
      id: crypto.randomUUID(),
      name: session.data?.user.role === UserRoles.ADMIN? trans.navbar.admin : trans.navbar.profile,
      href: session.data?.user.role === UserRoles.ADMIN? `/${locale}${Routes.ADMIN}` : `/${locale}${Routes.PROFILE}`,
    },
  ];

  const [openMenu, setopenMenu] = useState(false);

  return (
    <nav className="order-last lg:order-0">
      <Button
        variant={"secondary"}
        size={"sm"}
        className="lg:hidden"
        onClick={() => setopenMenu(true)}
      >
        <Menu className="w-6! h-6!"></Menu>
      </Button>
      <ul
        className={`
      fixed lg:static 
        ${openMenu ? "z-50 left-0" : "left-full"}
      top-0 px-10 py-20 lg:p-0 bg-background 
      lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full 
      lg:w-auto flex items-start lg:items-center gap-10
      `}
      >
        <Button
          variant={"secondary"}
          size={"sm"}
          className="lg:hidden absolute top-5 right-5"
          onClick={() => setopenMenu(false)}
        >
          <XIcon className="w-6! h-6!"></XIcon>
        </Button>
        {navItems.map((item) => {
          return (
            <li
              key={item.id}
              className="list-none capitalize"
              dir={
                locale === Languages.ENGLISH ? Directions.LTR : Directions.RTL
              }
            >
              <Custom_Link
                onClick={() => setopenMenu(false)}
                className={
                  pathName === item.href
                    ? "px-8! rounded-full! text-primary font-bold text-[16px]"
                    : "px-8! rounded-full! hover:text-primary font-semibold duration-200 transition-colors text-[16px]"
                }
                href={item.href}
              >
                {item.name}
              </Custom_Link>
            </li>
          );
        })}
        <li className="lg:hidden flex flex-col gap-4 px-8">
          <div onClick={() => setopenMenu(false)}>
            <AuthButtons
              translation={trans}
              locale={locale}
              initialSession={initialSession}
            />
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
