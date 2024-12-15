import config from "@/config";
import { Product, Shop, TMeta } from "@/types";

// Function to fetch shops from the API
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
    categories: string[] = [],
    brands: string[] = [],
    shopId?: number
): Promise<{
    products: Product[];
    totalPages: number;
    totalProducts: number;
}> {
    const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        categories: categories.join(","),
        brands: brands.join(","),
        ...(shopId ? { shopId: shopId.toString() } : {}),
    });

    const response = await fetch(
        `${config.host}/api/product?${query.toString()}`,
        {
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }
    const result = await response.json();
    return {
        products: result?.data || [],
        totalPages: result?.meta?.totalPage,
        totalProducts: result?.meta?.total,
    };
}

// Function to fetch a single product by ID
export async function getProductBySlug(
    slug: string
): Promise<Product | undefined> {
    const response = await fetch(`${config.host}/api/product/${slug}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }
    const result = await response.json();
    return result?.data;
}
