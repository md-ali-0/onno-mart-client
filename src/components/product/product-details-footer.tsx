"use client";

import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import StarRating from "./star-rating";

export default function ProductDetailsFooter({
    product,
}: {
    product: Product;
}) {
    const [activeTab, setActiveTab] = useState<"description" | "review">(
        "description"
    );
    console.log(product);
    
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
            <div className="lg:col-span-3 md:col-span-5">
                <div className="sticky top-20">
                    <ul
                        className="flex-column p-6 bg-white dark:bg-slate-900 border dark:shadow-gray-800 rounded-md"
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                    >
                        <li className="ms-0">
                            <button
                                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ${
                                    activeTab === "description"
                                        ? "text-white bg-orange-500 hover:text-white"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </button>
                        </li>
                        <li className="ms-0">
                            <button
                                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ${
                                    activeTab === "review"
                                        ? "text-white bg-orange-500 hover:text-white"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("review")}
                            >
                                Review
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="lg:col-span-9 md:col-span-7">
                <div
                    id="myTabContent"
                    className="p-6 bg-white dark:bg-slate-900 border dark:shadow-gray-800 rounded-md"
                >
                    <div>
                        {activeTab === "description" && (
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Product Description
                                </h2>
                                <p className="mt-4">{product.description}</p>
                            </div>
                        )}
                        {activeTab === "review" && (
                            <div>
                                {product?.reviews?.length > 0 ? (
                                    product?.reviews?.map((review) => (
                                        <div
                                            key={review.id}
                                            className="mt-8 first:mt-0"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Image
                                                        src={review.user.avatar}
                                                        className="h-11 w-11 rounded-full shadow"
                                                        width={50}
                                                        height={50}
                                                        alt={review.user.name}
                                                    />
                                                    <div className="ms-3 flex-1">
                                                        <div className="text-lg font-semibold hover:text-orange-500 duration-500">
                                                            {review.user.name}
                                                        </div>
                                                        <p className="text-sm text-slate-400">
                                                            {new Date(
                                                                review.createdAt
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    weekday:
                                                                        "short",
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-md border  mt-6">
                                                <StarRating
                                                    rating={review.rating}
                                                />
                                                <p className="text-slate-400 italic">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h3>No Review Available</h3>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
