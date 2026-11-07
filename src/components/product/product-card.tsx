"use client";

import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    addProduct,
    removeProduct,
} from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ArrowLeftRight, Check, ShoppingCart } from "lucide-react";
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

/** Card anatomy follows the reference template: badges, rating, price row, two actions. */
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
    const categoryName = product.category?.name;

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
                "group flex h-full flex-col rounded-lg border bg-card p-3 transition-shadow hover:shadow-card",
                className
            )}
        >
            <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    aria-label={product.name}
                    className="block h-full w-full p-2"
                >
                    {imageFailed ? (
                        <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-muted-foreground/40">
                            {(product.name[0] ?? "?").toUpperCase()}
                        </span>
                    ) : (
                        <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 25vw, (min-width: 640px) 32vw, 46vw"
                            onError={() => setImageFailed(true)}
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                </Link>

                <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1">
                    {saved > 0 && <span className="badge-sale">Sale</span>}
                    {!inStock && (
                        <span className="rounded bg-foreground/70 px-2 py-0.5 text-[11px] font-bold uppercase text-background">
                            Sold out
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={toggleCompare}
                    aria-label={isCompared ? "Remove from compare" : "Add to compare"}
                    aria-pressed={isCompared}
                    title={isCompared ? "Remove from compare" : "Add to compare"}
                    className={cn(
                        "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded bg-primary/90 text-primary-foreground transition-colors hover:bg-primary",
                        isCompared && "bg-sale hover:bg-sale"
                    )}
                >
                    {isCompared ? (
                        <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                        <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                </button>
            </div>

            <div className="flex flex-1 flex-col pt-2.5">
                {categoryName && (
                    <Link
                        href={`/category/${product.category.slug}`}
                        className="truncate text-[13px] font-medium text-primary hover:underline"
                    >
                        {categoryName}
                    </Link>
                )}

                <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] text-[15px] font-medium leading-snug">
                    <Link
                        href={href}
                        onClick={() => addToRecentProducts(product)}
                        className="transition-colors hover:text-primary"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
                    {rating > 0 ? (
                        <>
                            <StarRating rating={rating} size={12} />
                            <span>({reviewCount})</span>
                        </>
                    ) : (
                        <span className="truncate">{product.shop?.name}</span>
                    )}
                    {inStock ? (
                        <span className="ml-auto flex items-center gap-1 rounded bg-[#E5FAE5] px-1.5 py-0.5 text-[11px] font-semibold text-[#1F7A20]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#24BD25]" />
                            In stock
                        </span>
                    ) : null}
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="price-strike">{formatPrice(product.price)}</span>
                    <span className="price">{formatPrice(price)}</span>
                    {saved > 0 && (
                        <span className="rounded bg-sale px-1.5 py-0.5 text-[11px] font-bold text-sale-foreground">
                            -{saved}%
                        </span>
                    )}
                </div>

                <div className="mt-3 space-y-1.5">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        variant="outline-primary"
                        label="Add to cart"
                        disabled={!inStock}
                        className="w-full"
                    />
                    <button
                        type="button"
                        onClick={toggleCompare}
                        className="flex w-full items-center justify-center gap-1.5 rounded-full py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ShoppingCart className="hidden h-3.5 w-3.5" aria-hidden />
                        {isCompared ? "Remove from compare" : "Add to compare"}
                    </button>
                </div>
            </div>
        </article>
    );
}
