import { Category } from "@/types";
import { apiGet, cacheTags } from "./api";

/** Categories barely change, so they hold a longer window than products. */
export async function getCategories(): Promise<Category[]> {
    const result = await apiGet<{ data: Category[] }>(
        "/category?limit=999&sort=dec",
        { tags: [cacheTags.categories], revalidate: 900 }
    );
    return result?.data ?? [];
}