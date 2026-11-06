"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import ProductCard from "../product/product-card";

type Props = {
    all: Product[];
    onSale: Product[];
    topRated: Product[];
};

const TABS = [
    { id: "all", label: "All" },
    { id: "sale", label: "On sale" },
    { id: "rated", label: "Top rated" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * Only the tab switch is interactive. Every panel comes from the server and
 * stays in the HTML (hidden when inactive), so the catalogue stays crawlable.
 */
export default function ProductTabs({ all, onSale, topRated }: Props) {
    const [active, setActive] = useState<TabId>("all");

    const panels: Record<TabId, Product[]> = {
        all,
        sale: onSale,
        rated: topRated,
    };

    return (
        <div>
            <div
                role="tablist"
                aria-label="Product collections"
                className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1"
            >
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        id={`tab-${tab.id}`}
                        role="tab"
                        type="button"
                        aria-selected={active === tab.id}
                        aria-controls={`panel-${tab.id}`}
                        onClick={() => setActive(tab.id)}
                        className={cn(
                            "h-8 shrink-0 rounded-full px-4 text-[12px] font-semibold transition-colors",
                            active === tab.id
                                ? "bg-navy text-navy-foreground"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {(Object.keys(panels) as TabId[]).map((id) => (
                <div
                    key={id}
                    id={`panel-${id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${id}`}
                    className={cn(
                        "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
                        active !== id && "hidden"
                    )}
                >
                    {panels[id].map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ))}
        </div>
    );
}
