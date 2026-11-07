import ProductCard from "@/components/product/product-card";
import Breadcumb from "@/components/shared/breadcumb";
import ShopFilters from "@/components/shop/shop-filters";
import { getBrands } from "@/lib/get-brands";
import { getCategories } from "@/lib/get-categories";
import { getProducts } from "@/lib/get-products";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Server component. Previously this page was `"use client"` with RTK Query, so
 * every visit hit the API from the browser, nothing was cached, crawlers saw an
 * empty shell, and `?page=` was ignored because the state always started at 1.
 *
 * Now the data is fetched on the server with the `products` cache tag and a
 * 60s ISR window, filters live in the URL, and the grid is in the HTML.
 */
export const revalidate = 60;

const PAGE_SIZE = 12;

type SearchParams = Record<string, string | string[] | undefined>;

const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

function buildHref(
    params: Record<string, string | undefined>,
    page: number
): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value);
    }
    if (page > 1) search.set("page", String(page));
    const query = search.toString();
    return query ? `/products?${query}` : "/products";
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const page = Math.max(1, Number(single(searchParams.page) ?? 1) || 1);
    const searchTerm = single(searchParams.searchTerm);
    const categoryId = single(searchParams.categoryId);
    const brandId = single(searchParams.brandId);
    const minPriceRaw = single(searchParams.minPrice);
    const maxPriceRaw = single(searchParams.maxPrice);
    const sort = single(searchParams.sort) ?? "price-asc";

    const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
    const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
    const sortOrder = sort === "price-desc" ? "desc" : "asc";

    const [{ products, totalPages, totalProducts }, categories, brands] =
        await Promise.all([
            getProducts(
                page,
                PAGE_SIZE,
                categoryId,
                brandId,
                searchTerm,
                "price",
                sortOrder,
                minPrice,
                maxPrice
            ),
            getCategories(),
            getBrands(),
        ]);

    const query = {
        searchTerm,
        categoryId,
        brandId,
        minPrice: minPriceRaw,
        maxPrice: maxPriceRaw,
        sort: sort === "price-asc" ? undefined : sort,
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <Breadcumb />

            <section className="section">
                <div className="container-page">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12">
                        <div className="md:col-span-4 lg:col-span-3">
                            <ShopFilters
                                categories={categories}
                                brands={brands}
                                searchTerm={searchTerm}
                                categoryId={categoryId}
                                brandId={brandId}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                sort={sort}
                            />
                        </div>

                        <div className="md:col-span-8 lg:col-span-9">
                            <div className="mb-4 flex items-center justify-between border-b pb-2.5">
                                <p className="text-[12px] font-medium text-muted-foreground">
                                    {totalProducts} product
                                    {totalProducts === 1 ? "" : "s"}
                                    {searchTerm ? ` for “${searchTerm}”` : ""}
                                </p>
                                {page > 1 && (
                                    <p className="text-[12px] text-muted-foreground">
                                        Page {page} of {totalPages}
                                    </p>
                                )}
                            </div>

                            {products.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed py-20 text-center">
                                    <p className="text-[16px] font-semibold">
                                        Nothing matched
                                    </p>
                                    <p className="mt-1 text-[13px] text-muted-foreground">
                                        Try a wider price range or another
                                        category.
                                    </p>
                                    <Link
                                        href="/products"
                                        className="mt-4 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground"
                                    >
                                        Clear filters
                                    </Link>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <nav
                                    aria-label="Pagination"
                                    className="mt-9 flex flex-wrap items-center justify-center gap-1.5"
                                >
                                    <Link
                                        href={buildHref(query, Math.max(1, page - 1))}
                                        aria-disabled={page === 1}
                                        className={cn(
                                            "flex h-9 items-center gap-1 rounded-lg border px-3 text-[13px] transition-colors",
                                            page === 1
                                                ? "pointer-events-none opacity-40"
                                                : "hover:border-primary hover:text-primary"
                                        )}
                                    >
                                        <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                                        Prev
                                    </Link>

                                    {pages.map((number) => (
                                        <Link
                                            key={number}
                                            href={buildHref(query, number)}
                                            aria-current={number === page ? "page" : undefined}
                                            className={cn(
                                                "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-[13px] transition-colors",
                                                number === page
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "hover:border-primary hover:text-primary"
                                            )}
                                        >
                                            {number}
                                        </Link>
                                    ))}

                                    <Link
                                        href={buildHref(query, Math.min(totalPages, page + 1))}
                                        aria-disabled={page === totalPages}
                                        className={cn(
                                            "flex h-9 items-center gap-1 rounded-lg border px-3 text-[13px] transition-colors",
                                            page === totalPages
                                                ? "pointer-events-none opacity-40"
                                                : "hover:border-primary hover:text-primary"
                                        )}
                                    >
                                        Next
                                        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                                    </Link>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
