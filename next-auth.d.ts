import { User as authUser, Session as authSession } from 'next-auth'
import { JWT as authJWT } from 'next-auth/jwt'

export interface User extends authUser {
    id?: string
    login?: string
}

export interface Session extends authSession {
    user: {
        id?: string
        login?: string
    }
}

export interface JWT extends authJWT {
    id?: string
    login?: string
}