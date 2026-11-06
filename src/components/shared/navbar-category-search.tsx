"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

/**
 * Header search, styled as a hairline rule rather than a filled pill. Category
 * filtering lives on /products where there is room for it.
 */
export default function NavbarCategorySearch() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = searchTerm
            ? `?searchTerm=${encodeURIComponent(searchTerm.trim())}`
            : "";
        router.push(`/products${query}`);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className="w-full">
            <div className="flex h-9 items-center border-b border-foreground/20 transition-colors focus-within:border-foreground">
                <Search
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                    aria-hidden
                />

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
                    className="min-w-0 flex-1 bg-transparent px-2.5 text-[12px] outline-none placeholder:text-muted-foreground"
                />

                <button
                    type="submit"
                    className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
