"use client";

import { useGetAllFavoriteShopsQuery } from "@/redux/features/user/userApi";
import { Shop } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PopularShops() {
    const { data, isError, isLoading, isSuccess, error } =
        useGetAllFavoriteShopsQuery([
            {
                name: "limit",
                value: 6,
            },
        ]);

    useEffect(() => {
        if (isError) {
            toast.error("Something went wrong");
        }
    }, [isError, isSuccess, error]);

    if (isLoading) {
    }

    return (
        <section className="my-10 sm:my-14">
            <div className="container px-4 lg:px-0 relative">
                <h2 className="text-2xl font-bold mb-4">
                    Product by Followed Shops
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.data && data?.data?.length > 0 ? (
                        data?.data?.map((shop: Shop, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={shop?.logoUrl as string}
                                                alt=""
                                                className="w-12 h-12"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1">
                                            <h3 className="text-lg font-semibold">
                                                {shop.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 lg:h-56">
                                    {shop?.products
                                        ?.slice(0, 2)
                                        .map((product, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={product.thumbnail}
                                                        alt={product.name}
                                                        width={50}
                                                        height={50}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <span className="text-sm line-clamp-2">
                                                        {product.name}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    {product.price && (
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ${product.price}
                                                        </span>
                                                    )}
                                                    <span className="text-sm font-semibold ml-1">
                                                        $
                                                        {product?.price -
                                                            (product?.price *
                                                                product?.discount) /
                                                                100}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <Link
                                    href={`/shop?shopId=${shop.id}`}
                                    className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Visit Store
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <h3 className="text-center py-5">
                                No Products Available
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
