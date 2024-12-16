"use client";

import { addProduct } from "@/redux/features/compare/compareSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Product } from "@/types";
import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

const ProductCard = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();

    const handleProductClick = () => {
        addToRecentProducts(product);
    };

    return (
        <div
            className={`relative border overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl`}
        >
            <Link
                href={`/product/${product?.slug}`}
                onClick={handleProductClick}
                className="block relative h-64 w-full"
            >
                <Image
                    src={product?.thumbnail}
                    alt={product?.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 ease-in-out group-hover:scale-110"
                />
                {product?.discount > 0 && (
                    <div className="absolute top-10 -rotate-90 -left-[19px] bg-[#ed2939] text-white px-2 py-1 text-xs font-bold">
                        OFF {product?.discount}%
                    </div>
                )}
            </Link>
            <div className="p-4 bg-white">
                <div className="md:h-14">
                    <Link
                        href={`/product/${product?.slug}`}
                        onClick={handleProductClick}
                        className="font-medium mb-2 line-clamp-2"
                    >
                        {product?.name}
                    </Link>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <span className="text-xl font-bold text-primary">
                            ${" "}
                            {product?.price -
                                (product?.price * product?.discount) / 100}
                        </span>
                        {product?.discount > 0 && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                                ${product?.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div>
                        <StarRating rating={product?.rating} />
                    </div>
                </div>
                <div className="flex gap-3.5">
                    <AddToCartButton
                        product={product}
                        quantity={1}
                        clx="w-full bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white mt-2"
                    />
                    <Button onClick={()=>dispatch(addProduct(product))} size={'icon'} className="bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white mt-2 min-w-10">
                        <ArrowLeftRight />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
