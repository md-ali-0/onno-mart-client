"use client";

import React from "react";
import FlashSaleProductCard from "../product/fash-sale-product";

// Types for products
interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

const FlashSale: React.FC = () => {
    // Dummy data for trendy products
    const products: Product[] = [
        {
            id: 1,
            name: "Smartphone",
            image: "https://demo.shopperz.xyz/storage/96/conversions/1-cover.png",
            price: 999,
        },
        {
            id: 2,
            name: "Laptop",
            image: "https://demo.shopperz.xyz/storage/111/conversions/1-cover.png",
            price: 1999,
        },
        {
            id: 3,
            name: "Headphones",
            image: "https://demo.shopperz.xyz/storage/120/conversions/1-cover.png",
            price: 199,
        },
        {
            id: 4,
            name: "Smartwatch",
            image: "https://demo.shopperz.xyz/storage/125/conversions/1-cover.png",
            price: 299,
        },
    ];

    return (
        <section className="mb-10 sm:mb-20">
            <div className="container px-4 sm:px-0">
                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-7">
                    <h2 className="text-2xl sm:text-4xl font-bold capitalize">
                        Flash Sale
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <FlashSaleProductCard key={product.id}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
