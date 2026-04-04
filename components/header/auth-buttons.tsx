"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Translations } from "@/lib/types/Translations";
import Custom_Link from "../customlink";
import { Pages, Routes } from "@/contants/enums";
import { Locale } from "@/i18n.config";
import { usePathname } from "next/navigation";
import { useClientSession } from "@/hooks/useClientSession";
import { Session } from "next-auth";

const AuthButtons = ({
  translation,
  locale,
  initialSession,
}: {
  translation: Translations;
  locale: Locale;
  initialSession: Session | null;
}) => {
  const session = useClientSession(initialSession);

  const pathname = usePathname();

  // console.log(session);

  return (
    <div className="flex items-center gap-10">
      {
        /// In Case If Session Shared
        session.data?.user && (
          <Button
            size={"lg"}
            className="cursor-pointer px-8 lg:px-10 rounded-full"
            onClick={() => signOut()}
          >
            {translation.navbar.signOut}
          </Button>
        )
      }
      {
        /// In Case No Session Shared
        !session.data?.user && (
          <div className="flex lg:items-center lg:gap-6 flex-col lg:flex-row gap-4 mb-4 lg:mb-0">
            <Button
              size={"lg"}
              className={
                pathname === `/${locale}${Routes.AUTH}/${Pages.LOGIN}`
                  ? "bg-transparent text-primary font-bold hover:text-white! duration-200 ease-in-out"
                  : "cursor-pointer px-6 rounded-full"
              }
            >
              <Custom_Link href={`/${locale}${Routes.AUTH}/${Pages.LOGIN}`}>
                {translation.navbar.login}
              </Custom_Link>
            </Button>
            <Button
              size={"lg"}
              className={
                pathname === `/${locale}${Routes.AUTH}/${Pages.REGISTER}`
                  ? "bg-transparent text-primary font-bold hover:text-white! duration-200 ease-in-out"
                  : "cursor-pointer px-6 rounded-full"
              }
            >
              <Custom_Link href={`/${locale}${Routes.AUTH}/${Pages.REGISTER}`}>
                {translation.navbar.register}
              </Custom_Link>
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default AuthButtons;
