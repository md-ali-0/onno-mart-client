"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { ChevronDown } from "lucide-react";
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
        router.push(`/category/${slug}`);
    };

    return (
        <div className="relative">
            <button
                type="button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:text-primary"
            >
                Categories
                <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden
                />
            </button>

            {dropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-4 w-64 border bg-card py-2 shadow-lift">
                    <Link
                        href="/products"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        All products
                    </Link>
                    <ul className="mt-1 border-t pt-1">
                        {(data?.data ?? []).map((category) => (
                            <li key={category.id}>
                                <button
                                    type="button"
                                    onClick={() => handleCategoryClick(category.slug)}
                                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] transition-colors hover:text-primary"
                                >
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            width={24}
                                            height={24}
                                            className="h-6 w-6 shrink-0 object-cover"
                                        />
                                    ) : (
                                        <span className="h-6 w-6 shrink-0 bg-muted" />
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
