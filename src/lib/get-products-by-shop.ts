import { Product, TMeta } from "@/types";
import { apiGet, buildQuery, cacheTags } from "./api";

export async function getProductsByShop(
    page: number,
    shopId: string
): Promise<{ data: Product[]; meta: TMeta }> {
    return apiGet<{ data: Product[]; meta: TMeta }>(
        `/product${buildQuery({ page, limit: 8, shopId })}`,
        {
            tags: [cacheTags.products, cacheTags.shop(shopId)],
            revalidate: 60,
        }
    );
}