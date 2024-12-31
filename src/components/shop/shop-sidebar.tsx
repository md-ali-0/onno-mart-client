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
import { Button } from "../ui/button";

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
        params.delete("page"); // Reset pagination to the first page
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="rounded-xl border p-4 sticky top-40">
            <form className="mt-4">
                <div>
                    <label htmlFor="searchname" className="font-medium">
                        Search:
                    </label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            id="searchname"
                            className="h-9 w-full rounded px-3 border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                            placeholder="Search..."
                            value={localSearch || ""}
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="font-medium">Price Range:</label>
                    <div className="flex space-x-2 mt-2">
                        <input
                            type="number"
                            className="h-9 w-full rounded px-3 border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                            placeholder="Min"
                            value={localMinPrice || ""}
                            onChange={(e) =>
                                setLocalMinPrice(
                                    Number(e.target.value) || undefined
                                )
                            }
                        />
                        <input
                            type="number"
                            className="h-9 w-full rounded px-3 border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                            placeholder="Max"
                            value={localMaxPrice || ""}
                            onChange={(e) =>
                                setLocalMaxPrice(
                                    Number(e.target.value) || undefined
                                )
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        variant={"outline"}
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
                    >
                        Clear Filters
                    </Button>
                    <Button
                        type="button"
                        variant={"default"}
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                </div>
            </form>
            <div className="mt-4">
                <h5 className="font-medium">Brands:</h5>
                <div className="mt-2 space-y-1.5">
                    <Select
                        onValueChange={(value) => setBrand(value)}
                        value={selectedBrand}
                        disabled={isBrandLoading}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    isBrandLoading
                                        ? "Loading..."
                                        : "Select Brand"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Brands</SelectItem>

                            {brands?.data?.map((item) => (
                                <SelectItem
                                    key={item.slug}
                                    value={String(item.slug)}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-4">
                <h5 className="font-medium">Categories:</h5>
                <div className="mt-2 space-y-1.5">
                    <Select
                        onValueChange={(value) => setCategory(value)}
                        value={selectedCategory}
                        disabled={isCategoryLoading}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    isCategoryLoading
                                        ? "Loading..."
                                        : "Select Category"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>

                            {categories?.data?.map((item) => (
                                <SelectItem
                                    key={item.slug}
                                    value={String(item.slug)}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default ShopSidebar;
