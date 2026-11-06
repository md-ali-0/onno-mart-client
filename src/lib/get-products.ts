import { Product, Shop, TMeta } from "@/types";
import { apiGet, buildQuery, cacheTags } from "./api";

const REVALIDATE = {
    catalogue: 60,
    product: 120,
    shops: 180,
    sale: 30,
};

export async function getShops(
    page: number
): Promise<{ data: Shop[]; meta: TMeta }> {
    return apiGet<{ data: Shop[]; meta: TMeta }>(
        `/shop${buildQuery({ page, limit: 8 })}`,
        { tags: [cacheTags.shops], revalidate: REVALIDATE.shops }
    );
}

export async function getShopById(id: string): Promise<Shop | null> {
    try {
        const result = await apiGet<{ data?: Shop }>(
            `/shop/${encodeURIComponent(id)}`,
            {
                tags: [cacheTags.shops, cacheTags.shop(id)],
                revalidate: REVALIDATE.shops,
            }
        );
        return result?.data ?? null;
    } catch {
        return null;
    }
}

export async function getProducts(
    page: number,
    limit: number = 6,
    categoryId?: string,
    brandId?: string,
    searchTerm?: string,
    sortBy: string = "price",
    sortOrder: "asc" | "desc" = "asc",
    minPrice?: number,
    maxPrice?: number
): Promise<{
    products: Product[];
    totalPages: number;
    totalProducts: number;
}> {
    const result = await apiGet<{
        data?: Product[];
        meta?: { totalPage: number; total: number };
    }>(
        `/product${buildQuery({
            page,
            limit,
            categoryId,
            brandId,
            searchTerm,
            sortBy,
            sortOrder,
            minPrice,
            maxPrice,
        })}`,
        { tags: [cacheTags.products], revalidate: REVALIDATE.catalogue }
    );

    return {
        products: result?.data || [],
        totalPages: result?.meta?.totalPage ?? 1,
        totalProducts: result?.meta?.total ?? 0,
    };
}

export async function getProductBySlug(
    slug: string
): Promise<Product | undefined> {
    const result = await apiGet<{ data?: Product }>(
        `/product/${encodeURIComponent(slug)}`,
        {
            tags: [cacheTags.products, cacheTags.product(slug)],
            revalidate: REVALIDATE.product,
        }
    );
    return result?.data;
}

export async function getSaleProducts(): Promise<Product[] | []> {
    const result = await apiGet<{ data?: Product[] }>(
        "/product/flash-sale?limit=8",
        {
            tags: [cacheTags.products, cacheTags.sale],
            revalidate: REVALIDATE.sale,
        }
    );
    return result?.data ?? [];
}

/**
 * Ranked collections used by the home page tabs. These used to be fetched by a
 * client-side Redux query, which meant the products never reached the HTML.
 * A failed API call degrades to an empty section instead of failing the build.
 */
export async function getRankedProducts(
    kind: "best-selling" | "top-rated",
    limit = 4
): Promise<Product[]> {
    try {
        const result = await apiGet<{ data?: Product[] }>(
            `/product/${kind}${buildQuery({ limit })}`,
            { tags: [cacheTags.products], revalidate: REVALIDATE.catalogue }
        );
        return result?.data ?? [];
    } catch {
        return [];
    }
}

export async function getRecentProducts(limit = 8): Promise<Product[]> {
    try {
        const result = await apiGet<{ data?: Product[] }>(
            `/product${buildQuery({
                page: 1,
                limit,
                sortBy: "createdAt",
                sortOrder: "desc",
            })}`,
            { tags: [cacheTags.products], revalidate: REVALIDATE.catalogue }
        );
        return result?.data ?? [];
    } catch {
        return [];
    }
}