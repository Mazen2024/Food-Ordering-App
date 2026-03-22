import { authOptions } from "@/Server/DB/Auth"
import NextAuth from "next-auth"


//// Auth Options Defined External
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }