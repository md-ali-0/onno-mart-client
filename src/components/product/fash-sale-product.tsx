"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../shared/add-to-cart";
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

const FlashSaleProductCard = ({ product }: { product: Product }) => {
    const handleProductClick = () => {
        addToRecentProducts(product);
    };
    return (
        <div className="group bg-white border sm:p-2 rounded-2xl sm:shadow-card transition-all duration-300 sm:hover:shadow-hover group">
            <div className="relative overflow-hidden rounded-xl isolate">
                <label className="capitalize text-xs font-semibold rounded-xl py-1 px-2 shadow absolute top-3 left-3 z-10 bg-red-600 text-white">
                    Flash Sale
                </label>
                <Image
                    src={product?.thumbnail}
                    alt="product"
                    width={400}
                    height={650}
                    className="w-full rounded-xl transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        clx="w-full"
                    />
                </div>
            </div>
            <div className="px-1 sm:px-0 pt-4 pb-2">
                <h3 className="capitalize text-base font-semibold whitespace-nowrap transition-all duration-300 hover:text-primary">
                    <Link
                        href={`/product/${product?.slug}`}
                        onClick={handleProductClick}
                        className="block overflow-hidden text-ellipsis"
                    >
                        {product?.name}
                    </Link>
                </h3>
                <div className="flex justify-between items-center">
                    <div className="flex flex-wrap-reverse items-center gap-x-3 gap-y-1">
                        <h3 className="text-xl sm:text-[22px] font-bold">
                            <span>
                                $
                                {product?.price -
                                    (product?.price * product?.discount) / 100}
                            </span>
                        </h3>
                        <h4 className="text-sm sm:text-base font-semibold text-red-500">
                            <del>${product?.price.toFixed(2)}</del>
                        </h4>
                    </div>
                    <div>
                        <StarRating rating={product?.rating} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleProductCard;
