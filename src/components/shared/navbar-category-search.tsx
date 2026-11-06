"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavbarCategorySearch() {
    const { data, isError } = useGetAllCategoriesQuery([
        { name: "limit", value: 999 },
    ]);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        if (isError) toast.error("Could not load categories");
    }, [isError]);

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
            <div className="flex h-10 items-center rounded-full border bg-secondary/60 pl-3 pr-1 transition-colors focus-within:border-primary focus-within:bg-card">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />

                <label htmlFor="nav-category" className="sr-only">
                    Category
                </label>
                <select
                    id="nav-category"
                    name="categoryId"
                    disabled={!data?.data?.length}
                    onChange={(event) => setCategoryId(event.target.value)}
                    className="ml-1 hidden max-w-[7.5rem] shrink-0 cursor-pointer border-r bg-transparent pr-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground outline-none sm:block"
                >
                    <option value="">All</option>
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
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none placeholder:text-muted-foreground"
                />

                <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-3.5 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Search className="h-3.5 w-3.5" aria-hidden />
                </button>
            </div>
        </form>
    );
}
