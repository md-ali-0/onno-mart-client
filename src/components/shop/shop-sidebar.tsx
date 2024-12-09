"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Brand, Category } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
    categories: Category[];
    brands: Brand[];
    selectedCategories: string[];
    selectedBrands: string[];
    selectedShop?: number;
}
export default function ShopSidebar({
    categories,
    brands,
    selectedCategories,
    selectedBrands,
    selectedShop,
}: SidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilterChange = (
        type: "category" | "brand" | "shop",
        value: string | number
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (type === "shop") {
            if (selectedShop === value) {
                params.delete("shop");
            } else {
                params.set("shop", value.toString());
            }
        } else {
            const current = params.get(type)?.split(",").filter(Boolean) || [];
            const updated = current.includes(value.toString())
                ? current.filter((item) => item !== value.toString())
                : [...current, value.toString()];

            if (updated.length > 0) {
                params.set(type, updated.join(","));
            } else {
                params.delete(type);
            }
        }

        params.set("page", "1"); // Reset to first page on filter change
        router.push(`/shop?${params.toString()}`);
    };
    return (
        <div className="rounded-xl border p-4 sticky top-20">
            <form className="mt-4">
                <div>
                    <label htmlFor="searchname" className="font-medium">
                        Search:
                    </label>
                    <div className="relative mt-2">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="absolute size-4 top-[9px] end-4 text-slate-900 dark:text-white"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx={11} cy={11} r={8} />
                            <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            className="h-9 pe-10 rounded px-3 border border-gray-100 dark:border-gray-800 focus:ring-0 outline-none bg-white dark:bg-slate-900"
                            name="s"
                            id="searchItem"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </form>
            <div className="mt-4">
                <h5 className="font-medium">Brands:</h5>
                <ul className="list-none mt-2">
                    {brands.map((brand) => (
                        <li
                            key={brand.id}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <Checkbox
                                id={brand.id}
                                checked={selectedBrands.includes(brand.id)}
                                onCheckedChange={() =>
                                    handleFilterChange("brand", brand.id)
                                }
                            />
                            <Label htmlFor={brand.id}>{brand.name}</Label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h5 className="font-medium">Categories:</h5>
                <ul className="list-none mt-2">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <Checkbox
                                id={category.id}
                                checked={selectedCategories.includes(
                                    category.id
                                )}
                                onCheckedChange={() =>
                                    handleFilterChange("category", category.id)
                                }
                            />
                            <Label htmlFor={category.id}>{category.name}</Label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
