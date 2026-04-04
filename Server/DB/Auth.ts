import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaObj } from "@/lib/prisma";
import { Pages, Routes } from "@/contants/enums";
import { loginLogic } from "../_actions/Auth/authactions";
import { Locale } from "@/i18n.config";

export const authOptions: NextAuthOptions = {
  session: {
    //// Default = JWT = Stateless Authentication
    strategy: "jwt",
    // maxAge : 7 * 24 * 60 * 60 = 7 Days
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials, req) => {
        /// Because Next Auth & Proxy Fire At The Same Time ,
        // We Don't Use (GetCurrentLocale Helper Method), Instead Use Split Method For Request
        const currentURL = req?.headers?.referer;
        const locale = currentURL?.split("/")[3] as Locale;

        //// Use Login Logic Server Action
        const res = await loginLogic(credentials, locale);

        /// Handle Successful Login = 200
        if (res?.status === 200 && res.user) {
          return res.user;
        } else {
          /// Handle Validation Error OR DataBase Errors
          throw new Error(
            JSON.stringify({
              validationErrors: res?.error,
              responseErrors: res?.message,
            }),
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prismaObj),
  pages: {
    signIn: `${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
