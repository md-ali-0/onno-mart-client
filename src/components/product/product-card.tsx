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
 * Borderless tile, like a printed catalogue entry: plate, small caps brand,
 * serif name, price. No card frame, no shadow, no rounded box — those are what
 * made the grid read as a dashboard.
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
                "group relative flex h-full flex-col",
                !inStock && "opacity-85",
                className
            )}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    aria-label={product.name}
                    className="block h-full w-full"
                >
                    {imageFailed ? (
                        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl text-muted-foreground/40">
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
                                "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
                                !inStock && "grayscale-[0.4]"
                            )}
                        />
                    )}
                </Link>

                <div className="pointer-events-none absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1">
                    {saved > 0 && <span className="badge-sale">−{saved}%</span>}
                    {!inStock && <span className="badge-stock">Sold out</span>}
                    {lowStock && (
                        <span className="badge-stock">{inventory} left</span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={toggleCompare}
                    aria-label={isCompared ? "Remove from compare" : "Add to compare"}
                    aria-pressed={isCompared}
                    title={isCompared ? "Remove from compare" : "Add to compare"}
                    className={cn(
                        "absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center border transition-colors",
                        "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100",
                        isCompared
                            ? "border-primary bg-primary text-primary-foreground opacity-100"
                            : "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                >
                    {isCompared ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                        <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col pt-3">
                {brandName && (
                    <p className="label-caps truncate">{brandName}</p>
                )}

                <h3 className="mt-1.5 line-clamp-2 min-h-[2.7em] font-display text-[15px] font-normal leading-[1.35]">
                    <Link
                        href={href}
                        onClick={() => addToRecentProducts(product)}
                        className="transition-colors hover:text-primary"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-1.5 flex h-[16px] items-center gap-1.5 text-[11px]">
                    {rating > 0 ? (
                        <>
                            <StarRating rating={rating} size={12} />
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
                    <div className="flex items-baseline gap-2">
                        <span className="font-display text-[17px] font-medium tabular-nums tracking-tight">
                            {formatPrice(price)}
                        </span>
                        {saved > 0 && (
                            <span className="price-strike">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>
                    {/* Fixed height so prices sit on one baseline across a row,
                        whether or not a product is discounted. */}
                    <p className="mt-0.5 h-[14px] text-[11px] font-medium text-primary">
                        {saved > 0 ? `Save ${formatPrice(savedAmount)}` : null}
                    </p>
                </div>

                <div className="mt-3">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        variant="quiet"
                        disabled={!inStock}
                        className="w-full"
                    />
                </div>
            </div>
        </article>
    );
}
