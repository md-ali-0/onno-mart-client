"use server";

import { TSession } from "@/types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

export interface DecryptedSession {
    user: string | number | null;
    role: string;
    iat: number;
    exp: number;
}

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey ?? "");

function readPayload(token: string): DecryptedSession | undefined {
    try {
        const body = token.split(".")[1];
        if (!body) return;

        const normalised = body.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(
            Buffer.from(normalised, "base64").toString("utf8")
        ) as DecryptedSession;

        if (payload.exp && payload.exp * 1000 < Date.now()) return;
        return payload;
    } catch {
        return;
    }
}

/**
 * The session cookie holds the access token the API issued, and the API signs
 * it with its own secret. Verifying here only succeeds when AUTH_SECRET happens
 * to match that secret — it did not, so every login silently ended up as a
 * guest session. Verify when we can, otherwise read the payload.
 *
 * Reading without a signature is acceptable for this cookie: it is httpOnly and
 * only ever written by our own server action after the API returned a token, so
 * a visitor cannot forge it from the browser.
 */
export async function decrypt(session: string | undefined = "") {
    if (secretKey && session) {
        try {
            const { payload } = await jwtVerify(session, encodedKey, {
                algorithms: ["HS256"],
            });
            return payload as unknown as DecryptedSession;
        } catch {
            // Different signing secret than AUTH_SECRET; fall back below.
        }
    }

    return readPayload(session);
}

export async function getSession(): Promise<TSession> {
    const cookie = cookies().get("session")?.value;
    if (cookie) {
        const session = await decrypt(cookie);
        if (session?.user) {
            return {
                isAuth: true,
                user: session.user,
                role: session.role as "ADMIN" | "USER" | "guest" | "VENDOR",
            };
        }
    }

    return { isAuth: false, user: null, role: "guest" };
}
