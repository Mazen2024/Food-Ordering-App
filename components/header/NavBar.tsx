"use client";
import { Pages, Routes } from "@/contants/enums";
import Custom_Link from "../customlink";
import { Button, buttonVariants } from "../ui/button";
import { Key, Menu, XIcon } from "lucide-react";
import { useState } from "react";
import CartButtons from "./CartButtons";
import { Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./language-switcher";

const NavBar = ({ trans, locale }: { trans: { [Key: string]: string }, locale : Locale }) => {

  const pathName = usePathname()

  const navItems = [
    {
      id: crypto.randomUUID(),
      name: trans.menu,
      href: `/${locale}${Routes.MENU}`,
    },
    {
      id: crypto.randomUUID(),
      name: trans.about,
      href: `/${locale}${Routes.ABOUT}`,
    },
    {
      id: crypto.randomUUID(),
      name: trans.contact,
      href: `/${locale}${Routes.CONTACT}`,
    },
    {
      id: crypto.randomUUID(),
      name: trans.login,
      href: `/${locale}${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];

  const [openMenu, setopenMenu] = useState(false);

  return (
    <nav className="flex flex-1 justify-end">
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
            <li key={item.id} className="list-none capitalize">
              <Custom_Link
                onClick={() => setopenMenu(false)}
                className={` 
                  ${
                    item.href === `${Routes.AUTH}/${Pages.LOGIN}`
                      ? // Chadcnui Button With Custome Over-ride
                        `px-8! rounded-full! ${buttonVariants({ size: "lg" })}`
                      : `hover:text-primary`
                  }
                  font-semibold duration-200 transition-colors text-[18px]
                  ${pathName.startsWith(`${item.href}`)? 'text-primary' : ''}
                `}
                href={item.href}
              >
                {item.name}
              </Custom_Link>
            </li>
          );
        })}
      </ul>
      <LanguageSwitcher /> 
      <CartButtons locale= {locale}  />
    </nav>
  );
};

export default NavBar;
