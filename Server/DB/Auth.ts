import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaObj } from "@/lib/prisma";
import { Pages, Routes } from "@/contants/enums";

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
      authorize: (credentials) => {
        let user = credentials;
        // console.log(user);
        return {
          id: crypto.randomUUID(),
          ...user,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prismaObj),
  pages : {
    signIn : `${Routes.AUTH}/${Pages.LOGIN}`  
  }
};
