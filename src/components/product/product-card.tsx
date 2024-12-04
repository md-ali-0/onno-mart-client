"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard: React.FC = () => {
    // const toggleWishlist = (productId: number) => {
    //     setProducts((prev) =>
    //         prev.map((product) =>
    //             product.id === productId
    //                 ? { ...product, wishlist: !product.wishlist }
    //                 : product
    //         )
    //     );
    // };

    return (
        <div className="sm:p-2 rounded-2xl sm:shadow-card transition-all duration-300 sm:hover:shadow-hover group">
            <div className="relative overflow-hidden rounded-xl isolate">
                {/* <label className="capitalize text-xs font-semibold rounded-xl py-1 px-2 shadow absolute top-3 left-3 z-10 bg-slate-800 text-white">
                    Flash Sale
                </label> */}
                <button
                    type="button"
                    className="flex items-center justify-center size-8 rounded-full text-center text-base shadow absolute top-3 right-3 z-10 bg-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>
                <Image
                    src="https://demo.shopperz.xyz/storage/96/conversions/1-cover.png"
                    alt="product"
                    width={400}
                    height={650}
                    className="w-full rounded-xl transition-all duration-300 group-hover:scale-105"
                />
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
                {/* <div className="flex flex-wrap items-center gap-2 mb-5">
                    <StarRating rating={4}/>
                    <div className="flex items-center gap-1 mt-[5px]">
                        <span className="text-xs font-medium whitespace-nowrap text-text">
                            5.0
                        </span>
                        <span className="text-xs font-medium whitespace-nowrap text-text hover:text-primary">
                            (1 Review)
                        </span>
                    </div>
                </div> */}
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

export default ProductCard;
