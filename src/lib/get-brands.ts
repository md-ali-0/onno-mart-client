import { Brand } from "@/types";
import { apiGet, cacheTags } from "./api";

export async function getBrands(): Promise<Brand[]> {
    const result = await apiGet<{ data: Brand[] }>("/brand?limit=999", {
        tags: [cacheTags.brands],
        revalidate: 900,
    });
    return result?.data ?? [];
}