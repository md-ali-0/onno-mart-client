"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentViewProducts() {
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);

    // Fetch recent products from localStorage
    useEffect(() => {
        const storedProducts = localStorage.getItem("recentProducts");
        if (storedProducts) {
            setRecentProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div className="overflow-x-scroll md:overflow-auto">
            {recentProducts.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Image
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Product Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Price
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Discount
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="text-primary hover:underline"
                                    >
                                        {product.name}
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${(
                                        product.price -
                                        (product.price * product.discount) / 100
                                    ).toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {product.discount > 0
                                        ? `${product.discount}%`
                                        : "No Discount"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="bg-primary text-white px-3 py-1 rounded"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No recently viewed products.</p>
            )}
        </div>
    );
}
