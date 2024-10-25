import NextAuth from "next-auth"
import FortyTwoSchool from "next-auth/providers/42-school"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"
import type { User, Session, JWT } from '@/next-auth.d.ts'

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: true })
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
    providers: [FortyTwoSchool({
        clientId: process.env.AUTH_42_SCHOOL_ID,
        clientSecret: process.env.AUTH_42_SCHOOL_SECRET,
        authorization: {
            params: {
                scope: "public",
            },
        },
        profile(profile) {
            return {
                id: profile.id.toString(),
                login: profile.login,
                email: profile.email,
                name: profile.displayname,
                image: profile.image_url,
            }
        }
    })],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.id = user.id
                token.login = user.login
            }
            return token
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (token && session.user) {
                session.user.id = token.id
                session.user.login = token.login
            }
            return session
        },
    },
    pages: {
        error: "/auth/error",
        signIn: "/auth/signin",
    },
    debug: process.env.NODE_ENV === "development",
    trustHost: true,
})