"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import StarRating from "./star-rating";

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
        <div className="group">
            <div className="relative overflow-hidden shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800 rounded-md duration-500">
                <Image
                    src="https://demo.shopperz.xyz/storage/96/conversions/1-cover.png"
                    className="group-hover:scale-110 duration-500"
                    alt="product"
                    width={400}
                    height={650}
                />
                <div className="absolute -bottom-20 group-hover:bottom-3 start-3 end-3 duration-500">
                    <Button className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center text-white w-full rounded-md h-auto">
                        Add to Cart
                    </Button>
                </div>
                <ul className="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500 space-y-1">
                    <li>
                        <Button className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow">
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
                        </Button>
                    </li>
                    <li className="mt-1 ms-0">
                        <Link
                            className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
                            href="/shop-item-detail"
                        >
                            <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-4"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx={12} cy={12} r={3} />
                            </svg>
                        </Link>
                    </li>
                </ul>
                <ul className="list-none absolute top-[10px] start-4" />
            </div>
            <div className="mt-4">
                <Link
                    className="hover:text-primary text-lg font-medium"
                    href="/product/3"
                >
                    Mens White Slip Shoes
                </Link>
                <div className="flex justify-between items-center mt-1">
                    <p>
                        $16.00 <del className="text-slate-400">$21.00</del>
                    </p>
                    <StarRating rating={5} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
