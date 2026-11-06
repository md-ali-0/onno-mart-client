"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

/**
 * Header search. The category select that used to sit inside this field ate
 * most of the width and clipped the placeholder; category filtering lives on
 * /products where there is room for it.
 */
export default function NavbarCategorySearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = searchTerm ? `?searchTerm=${encodeURIComponent(searchTerm.trim())}` : "";
        router.push(`/products${query}`);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className="w-full">
            <div className="flex h-10 items-center rounded-full border bg-secondary/60 pl-3.5 pr-1 transition-colors focus-within:border-primary focus-within:bg-card">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />

                <label htmlFor="nav-search" className="sr-only">
                    Search products
                </label>
                <input
                    id="nav-search"
                    type="search"
                    name="searchTerm"
                    placeholder="Search products, brands, shops"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none placeholder:text-muted-foreground"
                />

                <button
                    type="submit"
                    aria-label="Search"
                    className="flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    <Search className="h-3.5 w-3.5" aria-hidden />
                </button>
            </div>
        </form>
    );
}
