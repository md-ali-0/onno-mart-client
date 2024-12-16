import config from "@/config";
import { Product, Shop, TMeta } from "@/types";

export async function getShops(
    page: number
): Promise<{ data: Shop[]; meta: TMeta }> {
    const limit: number = 8;
    const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    const response = await fetch(
        `${config.host}/api/shop?${query.toString()}`,
        {
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch shops.");
    }
    const result = await response.json();
    return result;
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
    const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(categoryId ? { categoryId } : {}),
        ...(brandId ? { brandId } : {}),
        ...(searchTerm ? { searchTerm } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
        ...(minPrice ? { minPrice: minPrice.toString() } : {}),
        ...(maxPrice ? { maxPrice: maxPrice.toString() } : {}),
    });

    const response = await fetch(
        `${config.host}/api/product?${query.toString()}`,
        {
            cache: "no-store",
        }
    );
    if (!response.ok) {
        console.log(response);
        
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const result = await response.json();
    return {
        products: result?.data || [],
        totalPages: result?.meta?.totalPage,
        totalProducts: result?.meta?.total,
    };
}

export async function getProductBySlug(
    slug: string
): Promise<Product | undefined> {
    const response = await fetch(`${config.host}/api/product/${slug}`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }
    const result = await response.json();
    return result?.data;
}

export async function getSaleProducts(): Promise<Product[] | []> {
    const response = await fetch(`${config.host}/api/product?sortBy=discount&limit=8`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }
    const result = await response.json();
    return result?.data;
}