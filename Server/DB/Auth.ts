import { DefaultSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaObj } from "@/lib/prisma";
import { Pages, Routes } from "@/contants/enums";
import { loginLogic } from "../_actions/Auth/authactions";
import { Locale } from "@/i18n.config";
import { UserRoles, Users } from "@/lib/generated/prisma/client";
import { email } from "zod";
import { JWT } from "next-auth/jwt";

/// Add User Table To Session
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: Users;
  }
}

/// Add User Role To JWT
declare module "next-auth/jwt" {
  interface JWT extends Partial<Users> {
    id: string;
    name: string;
    email: string;
    role: UserRoles;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.city = token.city as string;
        session.user.country = token.country as string;
        session.user.postalcode = token.postalcode as string;
        session.user.phone = token.phone as string;
        session.user.streetaddress = token.streetaddress as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
          streetaddress: token.streetaddress,
          postalcode: token.postalcode,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const currentUser = await prismaObj.users.findUnique({
        where: {
          email: token?.email,
        },
      });
      if (!currentUser) {
        return token;
      }
      return {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        image: currentUser.image,
        city: currentUser.city,
        country: currentUser.country,
        phone: currentUser.phone,
        postalcode: currentUser.postalcode,
        streetaddress: currentUser.streetaddress,
      };
    },
  },
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
