"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

/** The template's joined search group: category select, field, black button. */
export default function NavbarCategorySearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const { data } = useGetAllCategoriesQuery([{ name: "limit", value: 999 }]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = new URLSearchParams({
            ...(categoryId && { categoryId }),
            ...(searchTerm && { searchTerm }),
        }).toString();
        router.push(`/products${query ? `?${query}` : ""}`);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className="w-full">
            <div className="flex h-11 w-full overflow-hidden rounded-md border bg-card">
                <label htmlFor="nav-category" className="sr-only">
                    Category
                </label>
                <select
                    id="nav-category"
                    name="categoryId"
                    onChange={(event) => setCategoryId(event.target.value)}
                    className="hidden h-full max-w-[9.5rem] shrink-0 cursor-pointer border-r bg-transparent px-3 text-[14px] outline-none sm:block"
                >
                    <option value="">All categories</option>
                    {(data?.data ?? []).map((category) => (
                        <option key={category.id} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="nav-search" className="sr-only">
                    Search products
                </label>
                <input
                    id="nav-search"
                    type="search"
                    name="searchTerm"
                    placeholder="Explore what you need..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] outline-none placeholder:text-muted-foreground"
                />

                <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-full w-12 shrink-0 items-center justify-center bg-foreground text-background transition-colors hover:bg-primary"
                >
                    <Search className="h-4 w-4" aria-hidden />
                </button>
            </div>
        </form>
    );
}
