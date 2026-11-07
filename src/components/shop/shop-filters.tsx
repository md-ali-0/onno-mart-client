import { Brand, Category } from "@/types";
import Link from "next/link";

type ShopFiltersProps = {
    categories: Category[];
    brands: Brand[];
    searchTerm?: string;
    categoryId?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
};

const FIELD =
    "mt-1.5 h-10 w-full rounded-lg border border-input bg-card px-3 text-[14px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

/**
 * Server-rendered filter form. Plain GET submission to /products, so the URL
 * carries the state: links are shareable, the back button works, and the page
 * can be cached because nothing here is client state.
 */
export default function ShopFilters({
    categories,
    brands,
    searchTerm,
    categoryId,
    brandId,
    minPrice,
    maxPrice,
    sort,
}: ShopFiltersProps) {
    return (
        <aside className="lg:sticky lg:top-36">
            <form action="/products" method="get" className="rounded-lg border bg-card p-4">
                <p className="text-[13px] font-semibold">Filter</p>

                <div className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="filter-search" className="text-[12px] font-medium text-muted-foreground">
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
                        <span className="text-[12px] font-medium text-muted-foreground">
                            Price
                        </span>
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
                            <span aria-hidden className="text-muted-foreground">–</span>
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
                        <label htmlFor="filter-category" className="text-[12px] font-medium text-muted-foreground">
                            Category
                        </label>
                        <select
                            id="filter-category"
                            name="categoryId"
                            defaultValue={categoryId ?? ""}
                            className={FIELD}
                        >
                            <option value="">All categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="filter-brand" className="text-[12px] font-medium text-muted-foreground">
                            Brand
                        </label>
                        <select
                            id="filter-brand"
                            name="brandId"
                            defaultValue={brandId ?? ""}
                            className={FIELD}
                        >
                            <option value="">All brands</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.slug}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="filter-sort" className="text-[12px] font-medium text-muted-foreground">
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
