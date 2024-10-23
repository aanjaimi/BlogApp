"use server";

import { auth, signIn, signOut } from "@/auth";

export const CustomSignIn = async () => {
    return await signIn("42-school", { redirectTo: "/home" });
}

export const CustomAuth = async () => {
    return await auth();
}

export const CustomSignOut = async () => {
    return await signOut({ redirectTo: "/" });
}