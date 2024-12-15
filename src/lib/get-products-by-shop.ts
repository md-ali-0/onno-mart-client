import config from "@/config";
import { Product, TMeta } from "@/types";

export async function getProductsByShop(
    page: number,
    shopId: string
): Promise<{ data: Product[]; meta: TMeta }> {
    const limit: number = 8;
    const query = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        shopId: shopId.toString(),
    });

    const response = await fetch(
        `${config.host}/api/product?${query.toString()}`,
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
