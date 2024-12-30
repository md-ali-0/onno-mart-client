"use client";

import { useGetFlashSaleProductsQuery } from "@/redux/features/product/productApi";
import Image from "next/image";
import Link from "next/link";

export function MegaMenu() {
    const { data, isLoading } = useGetFlashSaleProductsQuery([
        {
            name: "limit",
            value: 3,
        },
    ]);

    if (isLoading) {
        return (
            <div className="absolute left-1/2 -translate-x-1/2 top-full z-50 bg-white py-4 shadow-lg rounded-xl min-w-[550px] flex justify-center items-center">
                <p className="text-gray-500 font-medium">Loading...</p>
            </div>
        );
    }

    return (
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300">
            <div className="border border-gray-200 rounded-xl absolute left-1/2 -translate-x-1/2 top-full z-50 bg-white py-4 shadow-2xl min-w-[600px]">
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                        Special Discount Products
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                        {data?.data?.map((product) => (
                            <Link
                                href={`/product/${product.slug}`}
                                key={product.id}
                                className="relative group border border-gray-200 flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-white transition-transform transform hover:scale-105"
                            >
                                <div className="relative w-full h-32 overflow-hidden rounded-md">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="mt-3 text-sm font-medium text-gray-700 text-center line-clamp-2">
                                    {product.name}
                                </h4>
                                <p className="mt-1 text-md text-orange-500 font-bold">
                                    ${product.price.toFixed(2)}
                                </p>
                                {product.discount > 0 && (
                                    <p className="text-xs text-gray-400 line-through">
                                        $
                                        {(
                                            product.price /
                                            (1 - product.discount / 100)
                                        ).toFixed(2)}
                                    </p>
                                )}
                                <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow-md group-hover:bg-orange-600 transition">
                                    -{product.discount}%
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
