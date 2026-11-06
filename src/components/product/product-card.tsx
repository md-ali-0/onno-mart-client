"use client";

import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    addProduct,
    removeProduct,
} from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ArrowLeftRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AddToCartButton } from "../shared/add-to-cart";
import StarRating from "./star-rating";

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

/** The single product tile used by every grid on the storefront. */
export default function ProductCard({ product, className }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const compare = useAppSelector((state) => state.compare.compare);
    const [imageFailed, setImageFailed] = useState(false);

    const price = discountedPrice(product);
    const saved = savingsPercent(product);
    const rating = Number(product.rating ?? 0);
    const reviewCount = product.reviews?.length ?? 0;
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
        <article
            className={cn(
                "group relative flex h-full flex-col rounded-xl border bg-card p-2.5 transition-shadow duration-200 hover:shadow-card",
                className
            )}
        >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    aria-label={product.name}
                    className="block h-full w-full"
                >
                    {imageFailed ? (
                        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/40">
                            {(product.name[0] ?? "?").toUpperCase()}
                        </span>
                    ) : (
                        <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 24vw, (min-width: 640px) 30vw, 45vw"
                            onError={() => setImageFailed(true)}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                </Link>

                {saved > 0 && (
                    <span className="badge-sale absolute left-2 top-2">
                        −{saved}%
                    </span>
                )}

                {!inStock && (
                    <span className="absolute inset-x-0 bottom-0 bg-foreground/70 py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-background">
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
                        "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border bg-card/90 shadow-sm transition-colors",
                        isCompared
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                >
                    {isCompared ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                        <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col px-0.5 pt-3">
                {brandName && (
                    <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {brandName}
                    </p>
                )}

                <h3 className="mt-1 line-clamp-2 min-h-[2.4rem] text-[13px] font-semibold leading-snug">
                    <Link
                        href={href}
                        onClick={() => addToRecentProducts(product)}
                        className="transition-colors hover:text-primary"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-1.5 flex h-[16px] items-center gap-1 text-[11px] text-muted-foreground">
                    {rating > 0 ? (
                        <>
                            <StarRating rating={rating} size={11} />
                            <span className="font-semibold text-foreground">
                                {rating.toFixed(1)}
                            </span>
                            {reviewCount > 0 && <span>({reviewCount})</span>}
                        </>
                    ) : shopName ? (
                        <span className="truncate">{shopName}</span>
                    ) : null}
                </div>

                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5">
                        <p className="price whitespace-nowrap">
                            {formatPrice(price)}
                        </p>
                        {saved > 0 && (
                            <p className="price-strike whitespace-nowrap">
                                {formatPrice(product.price)}
                            </p>
                        )}
                    </div>

                    <AddToCartButton
                        product={product}
                        quantity={1}
                        variant="icon"
                        disabled={!inStock}
                    />
                </div>
            </div>
        </article>
    );
}
