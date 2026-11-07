import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt, DecryptedSession } from "./lib/session";

/** Only these prefixes require a session, and only these roles may see them. */
const PROTECTED: Record<string, string[]> = {
    "/dashboard": ["ADMIN", "VENDOR"],
    "/user": ["USER", "ADMIN"],
};

const GUEST: DecryptedSession = { user: null, role: "guest", iat: 0, exp: 0 };

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Legacy browse URLs: /products?categoryId=beauty-care was the only way in
    // before the slug routes. 308 to the canonical path, keeping the filters.
    if (pathname === "/products") {
        const categoryId = req.nextUrl.searchParams.get("categoryId");
        const brandId = req.nextUrl.searchParams.get("brandId");

        if (categoryId || brandId) {
            const target = new URL(
                categoryId ? `/category/${categoryId}` : `/brand/${brandId}`,
                req.nextUrl.origin
            );
            req.nextUrl.searchParams.forEach((value, key) => {
                if (key !== "categoryId" && key !== "brandId") {
                    target.searchParams.set(key, value);
                }
            });
            return NextResponse.redirect(target, 308);
        }

        // /products is public; it is only in the matcher for the redirect above.
        return NextResponse.next();
    }

    const cookie = req.cookies.get("session")?.value;
    const session = cookie ? await decrypt(cookie) : GUEST;

    if (pathname.startsWith("/auth")) {
        // Signed-in visitors have no business on the sign-in page.
        return session?.user
            ? NextResponse.redirect(new URL("/", req.nextUrl))
            : NextResponse.next();
    }

    const requiredRole = Object.keys(PROTECTED).find((route) =>
        pathname.startsWith(route)
    );

    // Any other matched path is public. Previously every matched path required a
    // session, which locked anonymous visitors out of /products.
    if (!requiredRole) {
        return NextResponse.next();
    }

    if (!session?.user) {
        return NextResponse.redirect(
            new URL(`/auth/signin?redirect=${pathname}`, req.url)
        );
    }

    if (!PROTECTED[requiredRole].includes(session.role)) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/user/:path*", "/auth/:path*", "/products"],
};
