import { getBrands } from "@/lib/get-brands";
import { getCategories } from "@/lib/get-categories";
import { getProducts } from "@/lib/get-products";
import { redirect } from "next/navigation";
import ProductListing, { type ListingSearchParams } from "@/components/shop/product-listing";
import Breadcumb from "@/components/shared/breadcumb";

export const revalidate = 60;

const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: ListingSearchParams;
}) {
    // Old links used ?categoryId=beauty-care and ?brandId=apple. Send them to the
    // canonical path and keep the rest of the filters.
    const categoryId = single(searchParams.categoryId);
    const brandId = single(searchParams.brandId);

    if (categoryId || brandId) {
        const rest = new URLSearchParams();
        for (const [key, value] of Object.entries(searchParams)) {
            if (key === "categoryId" || key === "brandId") continue;
            const first = single(value);
            if (first) rest.set(key, first);
        }
        const query = rest.toString();
        const target = categoryId ? `/category/${categoryId}` : `/brand/${brandId}`;
        redirect(query ? `${target}?${query}` : target);
    }

    const [categories, brands] = await Promise.all([getCategories(), getBrands()]);

    return (
        <>
            <Breadcumb />
            <ProductListing
                basePath="/products"
                searchParams={searchParams}
                categories={categories}
                brands={brands}
                fetchProducts={(page, limit, sortOrder, minPrice, maxPrice, searchTerm) =>
                    getProducts(
                        page,
                        limit,
                        undefined,
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
