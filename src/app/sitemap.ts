import type { MetadataRoute } from "next";
import { getBrands } from "@/lib/get-brands";
import { getCategories } from "@/lib/get-categories";
import { getProducts, getShops } from "@/lib/get-products";
import { site } from "@/lib/site";

// Regenerated hourly; the product and shop entries come from the live API.
export const revalidate = 3600;

const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}/shops`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/flash-sale`, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/auth/signin`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/auth/signup`, changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    try {
        const [{ products }, { data: shops }, categories, brands] = await Promise.all([
            getProducts(1, 200),
            getShops(1),
            getCategories(),
            getBrands(),
        ]);

        const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
            url: `${site.url}/product/${product.slug}`,
            lastModified: product.updatedAt ? new Date(product.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.7,
        }));

        const shopRoutes: MetadataRoute.Sitemap = shops.map((shop) => ({
            url: `${site.url}/shop/${shop.id}`,
            lastModified: shop.updatedAt ? new Date(shop.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.5,
        }));

        const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
            url: `${site.url}/category/${category.slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.8,
        }));

        const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
            url: `${site.url}/brand/${brand.slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
        }));

        return [
            ...staticRoutes,
            ...categoryRoutes,
            ...brandRoutes,
            ...productRoutes,
            ...shopRoutes,
        ];
    } catch {
        // If the API is unreachable during a build, still ship a valid sitemap
        // for the static routes rather than failing the deploy.
        return staticRoutes;
    }
}