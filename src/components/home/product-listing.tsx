"use client";

import {
    useGetBestSellingProductsQuery,
    useGetTopRatedProductsQuery,
} from "@/redux/features/product/productApi";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import ProductCardBestTop from "../product/product-card-best-top";

export default function ProductListing() {
    const [activeTab, setActiveTab] = useState<"bestselling" | "toprated">(
        "bestselling"
    );

    const { data: bestSellingProducts = [], isLoading: isBestSellingLoading } =
        useGetBestSellingProductsQuery([{ name: "limit", value: 4 }]);
    const { data: topRatedProducts = [], isLoading: isTopRatedLoading } =
        useGetTopRatedProductsQuery([{ name: "limit", value: 4 }]);

    const products =
        activeTab === "bestselling" ? bestSellingProducts : topRatedProducts;
    const isLoading =
        activeTab === "bestselling" ? isBestSellingLoading : isTopRatedLoading;

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 mb-12 text-white relative overflow-hidden">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-4xl font-bold mb-2">Hurry Up!</h2>
                    <p className="text-6xl font-extrabold">25% OFF</p>

                    <p className="text-lg mt-2">WINTER25</p>
                    <p className="text-xl mt-2">For All Items</p>
                </motion.div>
                <div className="absolute right-10 bottom-0 opacity-20">
                    <div className="w-32 h-32 bg-white rounded-full"></div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-8 mb-8 border-b">
                <button
                    onClick={() => setActiveTab("bestselling")}
                    className={`pb-4 px-4 text-lg font-semibold relative ${
                        activeTab === "bestselling"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                >
                    Best Selling
                    {activeTab === "bestselling" && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("toprated")}
                    className={`pb-4 px-4 text-lg font-semibold relative ${
                        activeTab === "toprated"
                            ? "text-primary border-b-2 border-primary"
                            : "text-muted-foreground"
                    }`}
                >
                    Top Rated
                    {activeTab === "toprated" && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                          <motion.div
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                              className="bg-gray-200 h-72 rounded-2xl"
                          ></motion.div>
                      ))
                    : (products as { data: Product[] })?.data?.map((product) => (
                          <ProductCardBestTop key={product.id} product={product}/>
                      ))}
            </div>
        </div>
    );
}
