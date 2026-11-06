"use client";

import { addProduct } from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { AddToCartButton } from "../shared/add-to-cart";
import { Button } from "../ui/button";
import StarRating from "./star-rating";

const MAX_RECENT_PRODUCTS = 10;

const addToRecentProducts = (product: Product) => {
    const recentProductsKey = "recentProducts";
    let recentProducts: Product[] = JSON.parse(
        localStorage.getItem(recentProductsKey) || "[]"
    );

    recentProducts = recentProducts.filter((p) => p.id !== product.id);
    recentProducts.unshift(product);
    if (recentProducts.length > MAX_RECENT_PRODUCTS) {
        recentProducts.pop();
    }

    localStorage.setItem(recentProductsKey, JSON.stringify(recentProducts));
};

type ProductCardProps = {
    product: Product;
    className?: string;
};

const ProductCard = ({ product, className }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const compare = useAppSelector((state) => state.compare.compare);

    const price = discountedPrice(product);
    const saved = savingsPercent(product);
    const href = `/product/${product.slug}`;

    const addToCompare = () => {
        if (compare.length > 0 && compare[0].categoryId !== product.categoryId) {
            return toast.warning("You can compare only same-category products");
        }
        if (compare.some((item) => item.id === product.id)) {
            return toast.info("Already in your compare list");
        }
        dispatch(addProduct(product));
    };

    return (
        <div
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow duration-200 hover:shadow-lift",
                className
            )}
        >
            <Link
                href={href}
                onClick={() => addToRecentProducts(product)}
                className="relative block aspect-square w-full overflow-hidden bg-muted"
                aria-label={product.name}
            >
                <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                {saved > 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-[11px] font-semibold text-destructive-foreground">
                        −{saved}%
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                <Link
                    href={href}
                    onClick={() => addToRecentProducts(product)}
                    className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug transition-colors hover:text-primary"
                >
                    {product.name}
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <StarRating rating={Number(product.rating ?? 0)} />
                    <span className="tabular-nums">
                        {Number(product.rating ?? 0).toFixed(1)}
                    </span>
                </div>

                <div className="mt-auto flex items-baseline gap-2 pt-1">
                    <span className="price text-base">{formatPrice(price)}</span>
                    {saved > 0 && (
                        <span className="price-strike">{formatPrice(product.price)}</span>
                    )}
                </div>

                <div className="mt-2 flex gap-2">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        clx="h-9 w-full rounded-lg bg-secondary text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    />
                    <Button
                        type="button"
                        onClick={addToCompare}
                        size="icon"
                        variant="outline"
                        aria-label="Add to compare"
                        className="h-9 w-9 shrink-0"
                    >
                        <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;