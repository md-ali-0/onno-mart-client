"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ChevronDown, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavCategory() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const { data, isError } = useGetAllCategoriesQuery([
        { name: "limit", value: 999 },
    ]);

    useEffect(() => {
        if (isError) toast.error("Could not load categories");
    }, [isError]);

    const handleCategoryClick = (slug: string) => {
        setDropdownOpen(false);
        router.push(`/products?categoryId=${slug}`);
    };

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
                <LayoutGrid className="h-4 w-4" aria-hidden />
                All categories
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden
                />
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 max-h-[22rem] w-60 overflow-y-auto rounded-xl border bg-card p-2 shadow-lift category-scroll">
                    <Link
                        href="/products"
                        onClick={() => setDropdownOpen(false)}
                        className="mb-1 block rounded-lg bg-secondary px-3 py-2 text-sm font-medium"
                    >
                        All products
                    </Link>
                    <ul>
                        {(data?.data ?? []).map((category) => (
                            <li key={category.id}>
                                <button
                                    type="button"
                                    onClick={() => handleCategoryClick(category.slug)}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary"
                                >
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 shrink-0 rounded object-cover"
                                        />
                                    ) : (
                                        <span className="h-6 w-6 shrink-0 rounded bg-muted" />
                                    )}
                                    <span className="truncate">{category.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {dropdownOpen && (
                <button
                    type="button"
                    aria-label="Close categories"
                    onClick={() => setDropdownOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                />
            )}
        </div>
    );
}
