import { site } from "./site";

/**
 * Cache tags let the API bust the client cache on demand (see
 * `src/app/api/revalidate/route.ts`) instead of waiting out the window.
 */
export const cacheTags = {
    products: "products",
    product: (slug: string) => `product:${slug}`,
    shops: "shops",
    shop: (id: string) => `shop:${id}`,
    categories: "categories",
    brands: "brands",
    sale: "flash-sale",
} as const;

export class ApiError extends Error {
    constructor(
        message: string,
        readonly path: string,
        readonly status: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type ApiGetOptions = {
    tags?: string[];
    revalidate?: number;
};

/**
 * Every server-side read goes through here, which means one place decides how
 * long a response is cached. `revalidate` maps to ISR: the page keeps serving
 * the cached payload and refreshes in the background once the window expires.
 */
export async function apiGet<T>(
    path: string,
    { tags = [], revalidate = 60 }: ApiGetOptions = {}
): Promise<T> {
    const url = `${site.apiUrl}/api${path}`;
    const response = await fetch(url, {
        next: { revalidate, tags },
    });

    if (!response.ok) {
        throw new ApiError(
            `GET ${path} failed with ${response.status}`,
            path,
            response.status
        );
    }

    return (await response.json()) as T;
}

export function buildQuery(params: Record<string, unknown>): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null || value === "") continue;
        search.set(key, String(value));
    }
    const query = search.toString();
    return query ? `?${query}` : "";
}