"use client";

import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    addProduct,
    removeProduct,
} from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ArrowLeftRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AddToCartButton } from "../shared/add-to-cart";

const MAX_RECENT_PRODUCTS = 10;

const addToRecentProducts = (product: Product) => {
    try {
        const key = "recentProducts";
        const stored = JSON.parse(localStorage.getItem(key) || "[]") as Product[];
        const next = [product, ...stored.filter((item) => item.id !== product.id)].slice(
            0,
            MAX_RECENT_PRODUCTS
        );
        localStorage.setItem(key, JSON.stringify(next));
    } catch {
        // Storage can be unavailable (private mode); browsing still works.
    }
};

type ProductCardProps = {
    product: Product;
    className?: string;
};

/**
 * Image-first tile: no frame, no shadow. The photograph is the card; the only
 * chrome is a small sale flag and an add-to-bag bar that rises on hover.
 */
export default function ProductCard({ product, className }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const compare = useAppSelector((state) => state.compare.compare);
    const [imageFailed, setImageFailed] = useState(false);

    const price = discountedPrice(product);
    const saved = savingsPercent(product);
    const rating = Number(product.rating ?? 0);
    const inventory = product.inventory ?? 0;
    const inStock = inventory > 0;
    const isCompared = compare.some((item) => item.id === product.id);
    const href = `/product/${product.slug}`;
    const brandName = product.brand?.name ?? product.category?.name;
    const shopName = product.shop?.name;

    const toggleCompare = () => {
        if (isCompared) {
            dispatch(removeProduct({ id: product.id }));
            return;
        }
        if (compare.length > 0 && compare[0].categoryId !== product.categoryId) {
            toast.warning("You can compare only same-category products");
            return;
        }
        dispatch(addProduct(product));
    };

    return (
        <article className={cn("group relative flex h-full flex-col", className)}>
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    aria-label={product.name}
                    className="block h-full w-full"
                >
                    {imageFailed ? (
                        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl text-muted-foreground/30">
                            {(product.name[0] ?? "?").toUpperCase()}
                        </span>
                    ) : (
                        <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 24vw, (min-width: 640px) 30vw, 45vw"
                            onError={() => setImageFailed(true)}
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                    )}
                </Link>

                {saved > 0 && (
                    <span className="absolute left-0 top-0 bg-primary px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
                        −{saved}%
                    </span>
                )}

                {!inStock && (
                    <span className="absolute inset-0 flex items-center justify-center bg-background/75 text-[10px] uppercase tracking-[0.2em] text-foreground">
                        Sold out
                    </span>
                )}

                <button
                    type="button"
                    onClick={toggleCompare}
                    aria-label={isCompared ? "Remove from compare" : "Add to compare"}
                    aria-pressed={isCompared}
                    title={isCompared ? "Remove from compare" : "Add to compare"}
                    className={cn(
                        "absolute right-2 top-2 flex h-8 w-8 items-center justify-center transition-opacity",
                        isCompared
                            ? "bg-primary text-primary-foreground opacity-100"
                            : "bg-card text-foreground opacity-0 hover:text-primary focus-visible:opacity-100 group-hover:opacity-100"
                    )}
                >
                    {isCompared ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                        <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                </button>

                <div className="absolute inset-x-0 bottom-0 translate-y-0 transition-transform duration-300 sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        variant="bar"
                        label="Add to bag"
                        disabled={!inStock}
                    />
                </div>
            </div>

            <div className="flex flex-1 flex-col pt-3">
                {brandName && (
                    <p className="truncate text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {brandName}
                    </p>
                )}

                <h3 className="mt-1.5 line-clamp-2 min-h-[2.4rem] text-[13px] font-medium leading-snug">
                    <Link
                        href={href}
                        onClick={() => addToRecentProducts(product)}
                        className="transition-colors hover:text-primary"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-auto flex items-baseline justify-between gap-2 pt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="price">{formatPrice(price)}</span>
                        {saved > 0 && (
                            <span className="price-strike">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    {rating > 0 ? (
                        <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                            {rating.toFixed(1)}
                            <Star className="h-2.5 w-2.5 fill-current" aria-hidden />
                        </span>
                    ) : (
                        <span className="truncate text-[10px] text-muted-foreground">
                            {shopName}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
