"use server";

import { auth, signIn } from "@/auth";

export const CustomSignIn = async () => {
    return await signIn("42-school")
}

export const CustomAuth = async () => {
    return await auth();
}