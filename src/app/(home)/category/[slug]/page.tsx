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
    const categories = await getCategories();
    const category = categories.find((item) => item.slug === params.slug);

    if (!category) return { title: "Category not found" };

    return {
        title: `${category.name} — shop online`,
        description: `Browse ${category.name.toLowerCase()} from verified shops on OnnoMart. Compare prices and pay on delivery.`,
        alternates: { canonical: `/category/${category.slug}` },
    };
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: ListingSearchParams;
}) {
    const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
    const category = categories.find((item) => item.slug === params.slug);

    if (!category) notFound();

    return (
        <>
            <Breadcumb title={category.name} />
            <ProductListing
                basePath={`/category/${category.slug}`}
                searchParams={searchParams}
                categories={categories}
                brands={brands}
                categorySlug={category.slug}
                fetchProducts={(page, limit, sortOrder, minPrice, maxPrice, searchTerm) =>
                    getProducts(
                        page,
                        limit,
                        category.slug,
                        undefined,
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
