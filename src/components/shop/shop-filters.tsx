import Link from "next/link";

type ShopFiltersProps = {
    categories: { id: string; name: string; slug: string }[];
    brands: { id: string; name: string; slug: string }[];
    /** Where the form submits: /products, /category/x or /brand/y */
    action: string;
    categorySlug?: string;
    brandSlug?: string;
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
};

const FIELD =
    "mt-1.5 h-10 w-full rounded-lg border border-input bg-card px-3 text-[14px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const LABEL = "text-[12px] font-medium text-muted-foreground";

/**
 * Server-rendered filter form. Plain GET submission, so the URL owns the state:
 * shareable links, working back button, and no client JS.
 *
 * Category and brand are scopes that live in the path. When one is active it is
 * shown as a static chip; changing it goes through /products, which redirects to
 * the canonical /category/... or /brand/... URL.
 */
export default function ShopFilters({
    categories,
    brands,
    action,
    categorySlug,
    brandSlug,
    searchTerm,
    minPrice,
    maxPrice,
    sort,
}: ShopFiltersProps) {
    const activeCategory = categories.find((item) => item.slug === categorySlug);
    const activeBrand = brands.find((item) => item.slug === brandSlug);

    return (
        <aside className="lg:sticky lg:top-36">
            <form action={action} method="get" className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold">Filter</p>
                    {(activeCategory || activeBrand) && (
                        <Link
                            href="/products"
                            className="text-[12px] font-medium text-primary hover:underline"
                        >
                            Reset
                        </Link>
                    )}
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="filter-search" className={LABEL}>
                            Search
                        </label>
                        <input
                            id="filter-search"
                            name="searchTerm"
                            type="search"
                            defaultValue={searchTerm ?? ""}
                            placeholder="What are you after?"
                            className={FIELD}
                        />
                    </div>

                    <div>
                        <span className={LABEL}>Price</span>
                        <div className="mt-1.5 flex items-center gap-2">
                            <input
                                name="minPrice"
                                type="number"
                                min={0}
                                defaultValue={minPrice ?? ""}
                                aria-label="Minimum price"
                                placeholder="Min"
                                className="h-10 w-full rounded-lg border border-input bg-card px-3 text-[14px] outline-none focus:border-primary"
                            />
                            <span aria-hidden className="text-muted-foreground">
                                –
                            </span>
                            <input
                                name="maxPrice"
                                type="number"
                                min={0}
                                defaultValue={maxPrice ?? ""}
                                aria-label="Maximum price"
                                placeholder="Max"
                                className="h-10 w-full rounded-lg border border-input bg-card px-3 text-[14px] outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <div>
                        <span className={LABEL}>Category</span>
                        {activeCategory ? (
                            <p className="mt-1.5 flex items-center justify-between rounded-lg border border-primary/30 bg-accent px-3 py-2 text-[13px] font-medium text-primary">
                                {activeCategory.name}
                                <Link href="/products" aria-label="Clear category">
                                    ×
                                </Link>
                            </p>
                        ) : (
                            <select
                                id="filter-category"
                                name="categoryId"
                                defaultValue=""
                                aria-label="Category"
                                className={FIELD}
                            >
                                <option value="">All categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <span className={LABEL}>Brand</span>
                        {activeBrand ? (
                            <p className="mt-1.5 flex items-center justify-between rounded-lg border border-primary/30 bg-accent px-3 py-2 text-[13px] font-medium text-primary">
                                {activeBrand.name}
                                <Link href="/products" aria-label="Clear brand">
                                    ×
                                </Link>
                            </p>
                        ) : (
                            <select
                                id="filter-brand"
                                name="brandId"
                                defaultValue=""
                                aria-label="Brand"
                                className={FIELD}
                            >
                                <option value="">All brands</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.slug}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div>
                        <label htmlFor="filter-sort" className={LABEL}>
                            Sort
                        </label>
                        <select
                            id="filter-sort"
                            name="sort"
                            defaultValue={sort ?? "price-asc"}
                            className={FIELD}
                        >
                            <option value="price-asc">Price: low to high</option>
                            <option value="price-desc">Price: high to low</option>
                        </select>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t pt-4">
                    <button
                        type="submit"
                        className="h-10 flex-1 rounded-lg bg-primary text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Apply
                    </button>
                    <Link
                        href="/products"
                        className="flex h-10 items-center rounded-lg border px-4 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Clear
                    </Link>
                </div>
            </form>
        </aside>
    );
}
