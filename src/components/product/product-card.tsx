"use client";

import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    addProduct,
    removeProduct,
} from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ArrowLeftRight, Check, Store } from "lucide-react";
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

/**
 * The single product tile used everywhere: home sections, /products,
 * /flash-sale, shop pages and the related-products carousel.
 */
export default function ProductCard({ product, className }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const compare = useAppSelector((state) => state.compare.compare);
    const [imageFailed, setImageFailed] = useState(false);

    const price = discountedPrice(product);
    const saved = savingsPercent(product);
    const savedAmount = Math.max(0, product.price - price);
    const rating = Number(product.rating ?? 0);
    const reviewCount = product.reviews?.length ?? 0;
    const inventory = product.inventory ?? 0;
    const inStock = inventory > 0;
    const lowStock = inStock && inventory <= 10;
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
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card",
                "transition-[transform,border-color,box-shadow] duration-200",
                "hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lift",
                "focus-within:ring-2 focus-within:ring-ring/30",
                !inStock && "opacity-90",
                className
            )}
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    aria-label={product.name}
                    className="block h-full w-full"
                >
                    {imageFailed ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-background text-4xl font-semibold text-accent-foreground/40">
                            {(product.name[0] ?? "?").toUpperCase()}
                        </span>
                    ) : (
                        <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 24vw, (min-width: 640px) 30vw, 45vw"
                            onError={() => setImageFailed(true)}
                            className={cn(
                                "object-cover transition-transform duration-500 group-hover:scale-[1.06]",
                                !inStock && "grayscale-[0.35]"
                            )}
                        />
                    )}
                </Link>

                <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
                    {saved > 0 && <span className="badge-sale">−{saved}%</span>}
                    {!inStock && <span className="badge-stock">Out of stock</span>}
                    {lowStock && (
                        <span className="badge-stock">Only {inventory} left</span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={toggleCompare}
                    aria-label={isCompared ? "Remove from compare" : "Add to compare"}
                    aria-pressed={isCompared}
                    title={isCompared ? "Remove from compare" : "Add to compare"}
                    className={cn(
                        "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border bg-card shadow-sm",
                        "transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                        "opacity-100 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100",
                        isCompared
                            ? "border-primary text-primary sm:translate-y-0 sm:opacity-100"
                            : "text-muted-foreground"
                    )}
                >
                    {isCompared ? (
                        <Check className="h-4 w-4" aria-hidden />
                    ) : (
                        <ArrowLeftRight className="h-4 w-4" aria-hidden />
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col p-3 sm:p-4">
                {brandName && (
                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {brandName}
                    </p>
                )}

                <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug">
                    <Link
                        href={href}
                        onClick={() => addToRecentProducts(product)}
                        className="transition-colors hover:text-primary"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-1.5 flex h-[18px] items-center gap-1.5 text-xs">
                    {rating > 0 ? (
                        <>
                            <StarRating rating={rating} size={13} />
                            <span className="font-medium tabular-nums text-foreground">
                                {rating.toFixed(1)}
                            </span>
                            {reviewCount > 0 && (
                                <span className="text-muted-foreground">
                                    ({reviewCount})
                                </span>
                            )}
                        </>
                    ) : shopName ? (
                        <span className="flex min-w-0 items-center gap-1 text-muted-foreground">
                            <Store className="h-3 w-3 shrink-0" aria-hidden />
                            <span className="truncate">{shopName}</span>
                        </span>
                    ) : null}
                </div>

                <div className="mt-auto pt-3">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="price text-lg sm:text-xl">
                            {formatPrice(price)}
                        </span>
                        {saved > 0 && (
                            <span className="price-strike">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>
                    {saved > 0 && (
                        <p className="mt-0.5 text-[11px] font-medium text-success">
                            Save {formatPrice(savedAmount)}
                        </p>
                    )}
                </div>

                <div className="mt-3">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        variant="subtle"
                        disabled={!inStock}
                        className="w-full"
                    />
                </div>
            </div>
        </article>
    );
}
