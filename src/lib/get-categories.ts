import config from "@/config";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${config.host}/api/category?limit=999&sort=dec`, {
        cache: "no-store"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch category.");
    }
    const result = await response.json();

    return result?.data;
}
