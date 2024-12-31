"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductCard from "../product/product-card";

const ProductCardSkeleton = () => (
    <div className="p-4 border rounded-lg bg-white dark:bg-slate-900">
        <Skeleton className="h-40 w-full rounded mb-3" />
        <Skeleton className="h-6 w-3/4 rounded mb-2" />
        <Skeleton className="h-4 w-1/2 rounded" />
    </div>
);

const RecentProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const { data, isError, isLoading } = useGetAllProductsQuery([
        { name: "limit", value: 8 },
    ]);

    useEffect(() => {
        if (data) {
            setProducts(data.data || []);
        }
    }, [data]);

    useEffect(() => {
        if (isError) toast.error("Something Went Wrong");
    }, [isError]);

    return (
        <section className="mb-10 sm:mb-20">
            <div className="container px-4 lg:px-0">
                <div>
                    <div className="flex items-center justify-between gap-4 mb-5 sm:mb-7">
                        <h2 className="relative mb-[15px] text-2xl pb-[18px] before:w-[185px] before:bg-primary before:h-[2px] before:absolute before:-bottom-1 before:left-0 before:content-[''] font-bold text-gray-900">
                        Recent Products
                        </h2>
                        <Link
                            href="/products"
                            className="py-2 px-4 text-sm sm:py-3 sm:px-6 rounded-3xl capitalize sm:text-base font-semibold whitespace-nowrap bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                        >
                            Show More
                        </Link>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {isLoading
                                ? Array.from({ length: 8 }).map((_, idx) => (
                                      <ProductCardSkeleton key={idx} />
                                  ))
                                : products.map((product) => (
                                      <ProductCard
                                          key={product.id}
                                          product={product}
                                      />
                                  ))}
                        </div>
                        {!isLoading && products.length === 0 && (
                            <div className="flex items-center justify-center py-10">
                                <h3 className="text-xl font-medium">
                                    No Products Available
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentProducts;
