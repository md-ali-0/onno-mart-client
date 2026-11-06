"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useState } from "react";
import ProductCard from "../product/product-card";

type Props = {
    bestSelling: Product[];
    topRated: Product[];
};

const TABS = [
    { id: "best", label: "Best selling" },
    { id: "rated", label: "Top rated" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * Only the tab switch is interactive. Both product grids come from the server
 * and stay in the HTML (one hidden), so the catalogue is crawlable and the
 * switch is instant — no refetch, no loading skeleton, no framer-motion.
 */
export default function ProductTabs({ bestSelling, topRated }: Props) {
    const [active, setActive] = useState<TabId>("best");

    const panels: Record<TabId, Product[]> = {
        best: bestSelling,
        rated: topRated,
    };

    return (
        <div>
            <div
                role="tablist"
                aria-label="Product collections"
                className="mb-6 flex gap-6 border-b"
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
                            "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors",
                            active === tab.id
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
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
                        "grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4",
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
