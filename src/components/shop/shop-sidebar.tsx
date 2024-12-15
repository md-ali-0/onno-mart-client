"use client";

import { Brand, Category } from "@/types";
import { useRouter } from "next/navigation";

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
                            placeholder="Search..."
                            defaultValue={searchTerm}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const searchValue = (
                                        e.target as HTMLInputElement
                                    ).value.trim();
                                    handleFilterChange(
                                        "searchTerm",
                                        searchValue
                                    );
                                }
                            }}
                        />
                    </div>
                </div>
            </form>
            <div className="mt-4">
                <h5 className="font-medium">Brands:</h5>
                <ul className="list-none mt-2">
                    {brands.map((brand) => (
                        <li key={brand.id}>
                            <button
                                onClick={() =>
                                    handleFilterChange(
                                        "brandId",
                                        brand.slug === selectedBrand
                                            ? ""
                                            : brand.slug
                                    )
                                }
                                className={`${
                                    selectedBrand === brand.slug ? "text-primary" : ""
                                }`}
                            >
                                {brand.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h5 className="font-medium">Categories:</h5>
                <ul className="list-none mt-2">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                onClick={() =>
                                    handleFilterChange(
                                        "categoryId",
                                        category.slug === selectedCategory
                                            ? ""
                                            : category.slug
                                    )
                                }
                                className={`${
                                    selectedCategory === category.id
                                        ? "text-primary"
                                        : ""
                                }`}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShopSidebar;
