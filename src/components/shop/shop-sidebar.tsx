"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

const FIELD =
    "mt-1.5 h-10 w-full rounded-lg border border-input bg-card px-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function ShopSidebar({
    selectedCategory,
    setCategory,
    selectedBrand,
    setBrand,
    search,
    setSearch,
    setMinPrice,
    setMaxPrice,
}: {
    selectedCategory: string | undefined;
    setCategory: Dispatch<SetStateAction<string | undefined>>;
    selectedBrand: string | undefined;
    setBrand: Dispatch<SetStateAction<string | undefined>>;
    search: string | undefined;
    setSearch: Dispatch<SetStateAction<string | undefined>>;
    setMinPrice: Dispatch<SetStateAction<number | undefined>>;
    setMaxPrice: Dispatch<SetStateAction<number | undefined>>;
}) {
    const router = useRouter();
    const [localMinPrice, setLocalMinPrice] = useState<number | undefined>();
    const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>();
    const [localSearch, setLocalSearch] = useState<string | undefined>(search);

    const { data: categories, isLoading: isCategoryLoading } =
        useGetAllCategoriesQuery([{ name: "limit", value: 999 }]);

    const { data: brands, isLoading: isBrandLoading } = useGetAllBrandsQuery([
        { name: "limit", value: 999 },
    ]);

    const handleApplyFilters = () => {
        setSearch(localSearch);
        setMinPrice(localMinPrice || undefined);
        setMaxPrice(localMaxPrice || undefined);
        const params = new URLSearchParams(window.location.search);
        if (localSearch) {
            params.set("searchTerm", localSearch.trim());
        } else {
            params.delete("searchTerm");
        }
        if (localMinPrice !== undefined) {
            params.set("minPrice", localMinPrice.toString());
        } else {
            params.delete("minPrice");
        }
        if (localMaxPrice !== undefined) {
            params.set("maxPrice", localMaxPrice.toString());
        } else {
            params.delete("maxPrice");
        }
        params.delete("page");
        router.push(`/products?${params.toString()}`);
    };

    return (
        <aside className="lg:sticky lg:top-32">
            <p className="label-caps">Filter</p>

            <form className="mt-4 space-y-5 border-t pt-5">
                <div>
                    <label htmlFor="filter-search" className="label-caps">
                        Search
                    </label>
                    <input
                        id="filter-search"
                        type="text"
                        className={FIELD}
                        placeholder="What are you after?"
                        value={localSearch || ""}
                        onChange={(event) => setLocalSearch(event.target.value)}
                    />
                </div>

                <div>
                    <span className="label-caps">Price</span>
                    <div className="mt-1.5 flex items-center gap-2">
                        <input
                            type="number"
                            aria-label="Minimum price"
                            className="h-10 w-full rounded-lg border border-input bg-card px-3 text-[13px] outline-none transition-colors focus:border-primary"
                            placeholder="Min"
                            value={localMinPrice || ""}
                            onChange={(event) =>
                                setLocalMinPrice(Number(event.target.value) || undefined)
                            }
                        />
                        <span aria-hidden className="text-muted-foreground">
                            –
                        </span>
                        <input
                            type="number"
                            aria-label="Maximum price"
                            className="h-10 w-full rounded-lg border border-input bg-card px-3 text-[13px] outline-none transition-colors focus:border-primary"
                            placeholder="Max"
                            value={localMaxPrice || ""}
                            onChange={(event) =>
                                setLocalMaxPrice(Number(event.target.value) || undefined)
                            }
                        />
                    </div>
                </div>

                <div>
                    <span className="label-caps">Brand</span>
                    <Select
                        onValueChange={(value) => setBrand(value)}
                        value={selectedBrand}
                        disabled={isBrandLoading}
                    >
                        <SelectTrigger className="mt-1.5 h-10 rounded-lg border-input px-3 text-[13px] focus:ring-0">
                            <SelectValue
                                placeholder={isBrandLoading ? "Loading…" : "All brands"}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All brands</SelectItem>
                            {brands?.data?.map((item) => (
                                <SelectItem key={item.slug} value={String(item.slug)}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <span className="label-caps">Category</span>
                    <Select
                        onValueChange={(value) => setCategory(value)}
                        value={selectedCategory}
                        disabled={isCategoryLoading}
                    >
                        <SelectTrigger className="mt-1.5 h-10 rounded-lg border-input px-3 text-[13px] focus:ring-0">
                            <SelectValue
                                placeholder={
                                    isCategoryLoading ? "Loading…" : "All categories"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All categories</SelectItem>
                            {categories?.data?.map((item) => (
                                <SelectItem key={item.slug} value={String(item.slug)}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center justify-between gap-3 border-t pt-5">
                    <button
                        type="button"
                        onClick={() => {
                            setLocalSearch(undefined);
                            setLocalMinPrice(undefined);
                            setLocalMaxPrice(undefined);
                            setSearch(undefined);
                            setMinPrice(undefined);
                            setMaxPrice(undefined);
                            setCategory("all");
                            setBrand("all");
                        }}
                        className="text-[12px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={handleApplyFilters}
                        className="rounded-lg bg-primary px-5 py-2.5 text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </aside>
    );
}

export default ShopSidebar;
