import ProductCard from "@/components/product/product-card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ShopFilters from "./shop-filters";

export type ListingSearchParams = Record<string, string | string[] | undefined>;

const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

function buildHref(
    basePath: string,
    params: Record<string, string | undefined>,
    page: number
): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value) search.set(key, value);
    }
    if (page > 1) search.set("page", String(page));
    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
}

type ProductListingProps = {
    /** Where the filters and pagination should point, e.g. /category/beauty-care */
    basePath: string;
    searchParams: ListingSearchParams;
    categories: { id: string; name: string; slug: string }[];
    brands: { id: string; name: string; slug: string }[];
    categorySlug?: string;
    brandSlug?: string;
    fetchProducts: (
        page: number,
        limit: number,
        sortOrder: "asc" | "desc",
        minPrice?: number,
        maxPrice?: number,
        searchTerm?: string
    ) => Promise<{
        products: Parameters<typeof ProductCard>[0]["product"][];
        totalPages: number;
        totalProducts: number;
    }>;
};

const PAGE_SIZE = 12;

/**
 * Shared listing body for /products, /category/[slug] and /brand/[slug].
 * The scope comes from the path, the rest of the state from the query string,
 * so every combination is a shareable URL and the page stays server-rendered.
 */
export default async function ProductListing({
    basePath,
    searchParams,
    categories,
    brands,
    categorySlug,
    brandSlug,
    fetchProducts,
}: ProductListingProps) {
    const page = Math.max(1, Number(single(searchParams.page) ?? 1) || 1);
    const searchTerm = single(searchParams.searchTerm);
    const minPriceRaw = single(searchParams.minPrice);
    const maxPriceRaw = single(searchParams.maxPrice);
    const sort = single(searchParams.sort) ?? "price-asc";

    const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
    const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
    const sortOrder = sort === "price-desc" ? "desc" : "asc";

    const { products, totalPages, totalProducts } = await fetchProducts(
        page,
        PAGE_SIZE,
        sortOrder,
        minPrice,
        maxPrice,
        searchTerm
    );

    const query = {
        searchTerm,
        minPrice: minPriceRaw,
        maxPrice: maxPriceRaw,
        sort: sort === "price-asc" ? undefined : sort,
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <section className="section">
            <div className="container-page">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-12">
                    <div className="md:col-span-4 lg:col-span-3">
                        <ShopFilters
                            categories={categories}
                            brands={brands}
                            action={basePath}
                            categorySlug={categorySlug}
                            brandSlug={brandSlug}
                            searchTerm={searchTerm}
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
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed py-20 text-center">
                                <p className="text-[16px] font-semibold">
                                    Nothing matched
                                </p>
                                <p className="mt-1 text-[13px] text-muted-foreground">
                                    Try a wider price range or another category.
                                </p>
                                <Link
                                    href={basePath}
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
                                    href={buildHref(basePath, query, Math.max(1, page - 1))}
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
                                        href={buildHref(basePath, query, number)}
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
                                    href={buildHref(
                                        basePath,
                                        query,
                                        Math.min(totalPages, page + 1)
                                    )}
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
    );
}
