"use server";

import { getSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Catalogue tags the storefront caches against (see `src/lib/api.ts`).
 * Anything else is ignored so a caller cannot flush arbitrary tags.
 */
const ALLOWED_TAGS = [
    "products",
    "categories",
    "brands",
    "shops",
    "flash-sale",
] as const;

type AllowedTag = (typeof ALLOWED_TAGS)[number];

/**
 * Called by the admin panel after a product, category, brand or shop changes.
 *
 * Without this the storefront kept serving its ISR snapshot for 30-180s after
 * an edit, which read as "my change did not save". Mutations run in the browser
 * through RTK Query, so this server action is the bridge to `revalidateTag`.
 */
export async function revalidateCatalogue(tags: AllowedTag[] = ["products"]) {
    const session = await getSession();

    if (!session.isAuth || !["ADMIN", "VENDOR"].includes(session.role)) {
        return { ok: false, message: "Not allowed" };
    }

    const unique = Array.from(new Set(tags)).filter((tag): tag is AllowedTag =>
        (ALLOWED_TAGS as readonly string[]).includes(tag)
    );

    for (const tag of unique) {
        revalidateTag(tag);
    }

    // Product edits also change the home page, listings and search results.
    revalidatePath("/");
    revalidatePath("/products");

    return { ok: true, revalidated: unique };
}
