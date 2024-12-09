import config from "@/config";
import { Brand, Category, Product, Shop } from "@/types";

// Function to fetch shops from the API
export async function getShops(): Promise<Shop[]> {
    const response = await fetch(`${config.host}/api/shop`);
    if (!response.ok) {
        throw new Error("Failed to fetch shops.");
    }
    return response.json();
}

// Function to fetch products with filters and pagination
export async function getProducts(
    page: number,
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
        categories: categories.join(","),
        brands: brands.join(","),
        ...(shopId ? { shopId: shopId.toString() } : {}),
    });

    const response = await fetch(
        `${config.host}/api/product?${query.toString()}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }
    const result = await response.json();
    return {
        products : result?.data || [],
        totalPages: result?.meta?.totalPage,
        totalProducts: result?.meta?.total,
    }
}

// Function to fetch a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
    const response = await fetch(`${config.host}/api/product/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }
    const result = await response.json();
    return result?.data;
}

// Fetch categories and brands from the API
export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${config.host}/api/category`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }
    const result = await response.json();
    return result?.data;
}

export async function getBrands(): Promise<Brand[]> {
    const response = await fetch(`${config.host}/api/brand`);
    if (!response.ok) {
        throw new Error("Failed to fetch brands.");
    }
    const result = await response.json();
    return result?.data;
}
