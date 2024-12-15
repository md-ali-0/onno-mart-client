import config from "@/config";
import { Brand } from "@/types";

export async function getBrands(): Promise<Brand[]> {
    const response = await fetch(`${config.host}/api/brand?limit=999`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch brands.");
    }
    const result = await response.json();
    return result?.data;
}
