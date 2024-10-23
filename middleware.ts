import { auth } from "@/auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:jpg|jpeg|gif|png|svg|ico|webp)).*)", "/"]
}

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== "/") {
        const newUrl = new URL("/", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
    if (req.auth && req.nextUrl.pathname === "/") {
        const newUrl = new URL("/home", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})