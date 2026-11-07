import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decrypt, DecryptedSession } from "./lib/session";

const roleBasedAccess: { [key: string]: string[] } = {
    "/dashboard": ["ADMIN", "VENDOR"],
    "/user": ["USER", "ADMIN"],
    // /checkout stays open so guests can order without an account.
};

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Legacy browse URLs: /products?categoryId=beauty-care used to be the only
    // way in. Send them to the canonical path with a real 308 (the page-level
    // redirect only produced a meta refresh for streamed responses).
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
    }

    const cookie = req.cookies.get("session")?.value;

    let session : DecryptedSession | undefined = {
        user: null,
        role: 'guest',
        iat: 0,
        exp: 0
    }

    if (cookie) {
        session = await decrypt(cookie);
    }

    if (!session?.user) {
        if (pathname.startsWith("/auth")) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(`/auth/signin?redirect=${pathname}`, req.url));
        }
    } else if (session?.user && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    const requiredRole = Object.keys(roleBasedAccess).find((route) =>
        pathname.startsWith(route)
    );

    if (requiredRole) {
        const allowedRoles = roleBasedAccess[requiredRole];
        if (!allowedRoles.includes(session?.role)) {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/user/:path*", "/auth/:path*", "/products"],
};
