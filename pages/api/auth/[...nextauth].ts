import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "string" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {

        //If no email or password throw an error
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        //Find unique user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        //Throw an error if user is not found
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials")
        }

        //Check if password is correct for the user
        const isCorrectPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        //If password is incorrect throw an error
        if (!isCorrectPass) {
            throw new Error("Invalid credentials")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
