import ProductListing, {
    type ListingSearchParams,
} from "@/components/shop/product-listing";
import Breadcumb from "@/components/shared/breadcumb";
import { getBrands } from "@/lib/get-brands";
import { getCategories } from "@/lib/get-categories";
import { getProducts } from "@/lib/get-products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

type Params = { slug: string };

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const brands = await getBrands();
    const brand = brands.find((item) => item.slug === params.slug);

    if (!brand) return { title: "Brand not found" };

    return {
        title: `${brand.name} — all products`,
        description: `Every ${brand.name} product listed on OnnoMart, from verified shops.`,
        alternates: { canonical: `/brand/${brand.slug}` },
    };
}

export default async function BrandPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: ListingSearchParams;
}) {
    const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
    const brand = brands.find((item) => item.slug === params.slug);

    if (!brand) notFound();

    return (
        <>
            <Breadcumb title={brand.name} />
            <ProductListing
                basePath={`/brand/${brand.slug}`}
                searchParams={searchParams}
                categories={categories}
                brands={brands}
                brandSlug={brand.slug}
                fetchProducts={(page, limit, sortOrder, minPrice, maxPrice, searchTerm) =>
                    getProducts(
                        page,
                        limit,
                        undefined,
                        brand.slug,
                        searchTerm,
                        "price",
                        sortOrder,
                        minPrice,
                        maxPrice
                    )
                }
            />
        </>
    );
}
