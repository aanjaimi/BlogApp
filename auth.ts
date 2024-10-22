import NextAuth from "next-auth"
import FortyTwoSchool from "next-auth/providers/42-school"
import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./lib/db"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"
import type { User, Session, JWT } from '@/next-auth.d.ts'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prismaNeon = new PrismaNeon(pool)
export const prisma = new PrismaClient({ adapter: prismaNeon })


export const { handlers, signIn, signOut, auth, unstable_update: update, } = NextAuth({
    jwt: {
        maxAge: 60 * 60,
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [FortyTwoSchool],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.login = user.login
            }
            return token
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.login = token.login
            }
            return session
        },
    },
})