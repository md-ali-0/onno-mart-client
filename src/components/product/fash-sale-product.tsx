"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const FlashSaleProductCard = ({product}: {product: Product}) => {

    return (
        <div className="group sm:p-2 rounded-2xl sm:shadow-card transition-all duration-300 sm:hover:shadow-hover group">
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
                    <Button className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center text-white w-full rounded-md h-auto z-10">
                        Add to Cart
                    </Button>
                </div>
            </div>
            <div className="px-1 sm:px-0 pt-4 pb-2">
                <h3 className="capitalize text-base font-semibold whitespace-nowrap transition-all duration-300 hover:text-primary">
                    <Link
                        href="/product/team-red-hoodie859"
                        className="block overflow-hidden text-ellipsis"
                    >
                        Team Red Hoodie
                    </Link>
                </h3>
                <div className="flex flex-wrap-reverse items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl sm:text-[22px] font-bold">
                        <span>$60.00</span>
                    </h3>
                    <h4 className="text-sm sm:text-base font-semibold text-red-500">
                        <del>$120.00</del>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default FlashSaleProductCard;
