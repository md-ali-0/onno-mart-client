"use client";

import { Brand, Category } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

function ShopSidebar({
    categories,
    brands,
    selectedCategory,
    selectedBrand,
    searchTerm,
}: {
    categories: Category[];
    brands: Brand[];
    selectedCategory?: string;
    selectedBrand?: string;
    searchTerm?: string;
}) {
    const router = useRouter();

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();

    const handleFilterChange = (filterType: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(filterType, value);
        } else {
            params.delete(filterType);
        }
        params.delete("page"); // Reset pagination to the first page
        router.push(`/products?${params.toString()}`);
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams(window.location.search);
        if (localSearchTerm) {
            params.set("searchTerm", localSearchTerm.trim());
        } else {
            params.delete("searchTerm");
        }
        if (minPrice !== undefined) {
            params.set("minPrice", minPrice.toString());
        } else {
            params.delete("minPrice");
        }
        if (maxPrice !== undefined) {
            params.set("maxPrice", maxPrice.toString());
        } else {
            params.delete("maxPrice");
        }
        params.delete("page"); // Reset pagination to the first page
        router.push(`/products?${params.toString()}`);
    };

    return (
        <div className="rounded-xl border p-4 sticky top-20">
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
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
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
                            value={minPrice || ""}
                            onChange={(e) =>
                                setMinPrice(Number(e.target.value) || undefined)
                            }
                        />
                        <input
                            type="number"
                            className="h-9 w-full rounded px-3 border focus:ring-0 outline-none bg-white dark:bg-slate-900"
                            placeholder="Max"
                            value={maxPrice || ""}
                            onChange={(e) =>
                                setMaxPrice(Number(e.target.value) || undefined)
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        variant={"outline"}
                        onClick={()=>{
                            setLocalSearchTerm("")
                            setMinPrice(undefined)
                            setMaxPrice(undefined)
                            router.push(`/products?page=1`)
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
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex items-center cursor-pointer space-x-1.5"
                        >
                            <Checkbox
                                id={brand.slug}
                                checked={selectedBrand === brand.slug}
                            />
                            <label
                                htmlFor={brand.slug}
                                onClick={() =>
                                    handleFilterChange(
                                        "brandId",
                                        brand.slug === selectedBrand
                                            ? ""
                                            : brand.slug
                                    )
                                }
                                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {brand.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <h5 className="font-medium">Categories:</h5>
                <div className="mt-2 space-y-1.5">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center cursor-pointer space-x-1.5"
                        >
                            <Checkbox
                                id={category.slug}
                                checked={selectedCategory === category.slug}
                            />
                            <label
                                htmlFor={category.slug}
                                onClick={() =>
                                    handleFilterChange(
                                        "categoryId",
                                        category.slug === selectedCategory
                                            ? ""
                                            : category.slug
                                    )
                                }
                                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShopSidebar;
