"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

// Types for product and promotion
interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

interface ProductSection {
    id: number;
    name: string;
    slug: string;
    products: Product[];
}

interface Promotion {
    id: number;
    slug: string;
    preview: string;
}

// Component
const ProductSection: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [productSections, setProductSections] = useState<ProductSection[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    useEffect(() => {
        setLoading(true);

        // Dummy data for product sections
        const dummyProductSections: ProductSection[] = [
            {
                id: 1,
                name: "Electronics",
                slug: "electronics",
                products: [
                    { id: 1, name: "Smartphone", image: "/dummy/smartphone.jpg", price: 999 },
                    { id: 2, name: "Laptop", image: "/dummy/laptop.jpg", price: 1999 },
                ],
            },
            {
                id: 2,
                name: "Books",
                slug: "books",
                products: [
                    { id: 3, name: "Fiction", image: "/dummy/book.jpg", price: 20 },
                    { id: 4, name: "Non-fiction", image: "/dummy/book2.jpg", price: 30 },
                ],
            },
        ];

        // Dummy data for promotions
        const dummyPromotions: Promotion[] = [
            { id: 1, slug: "promo-1", preview: "/dummy/promo1.jpg" },
            { id: 2, slug: "promo-2", preview: "/dummy/promo2.jpg" },
        ];

        // Simulate data fetching
        setTimeout(() => {
            setProductSections(dummyProductSections);
            setPromotions(dummyPromotions);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {productSections.map((productSection, key) => (
                <div key={productSection.id} className="mb-10 sm:mb-20">
                    {productSection.products.length > 0 && (
                        <section>
                            <div className="container">
                                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-7">
                                    <h2 className="text-2xl sm:text-4xl font-bold capitalize">
                                        {productSection.name}
                                    </h2>
                                    {productSections.length === 8 && (
                                        <Link
                                            href={{
                                                pathname: "/frontend/product-section",
                                                query: { slug: productSection.slug },
                                            }}
                                            className="py-2 px-4 text-sm sm:py-3 sm:px-6 rounded-3xl capitalize sm:text-base font-semibold whitespace-nowrap bg-primary-slate text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                                        >
                                            Show More
                                        </Link>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                    {productSection.products.map((product) => (
                                        <div key={product.id} className="product-item">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full rounded-lg"
                                            />
                                            <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                                            <p className="text-gray-500">${product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {promotions[key] && (
                        <section className="mb-10 sm:mb-20">
                            <div className="container">
                                <Link
                                    href={{
                                        pathname: "/frontend/promotion-products",
                                        query: { slug: promotions[key].slug },
                                    }}
                                >
                                    <img
                                        src={promotions[key].preview}
                                        alt="promotion"
                                        className="w-full rounded-3xl"
                                    />
                                </Link>
                            </div>
                        </section>
                    )}
                </div>
            ))}
            {productSections.length === 0 && promotions.length > 0 && (
                <div>
                    {promotions.map((promotion) => (
                        <section key={promotion.id} className="mb-10 sm:mb-20">
                            <div className="container">
                                <Link
                                    href={{
                                        pathname: "/frontend/promotion-products",
                                        query: { slug: promotion.slug },
                                    }}
                                >
                                    <img
                                        src={promotion.preview}
                                        alt="promotion"
                                        className="w-full rounded-3xl"
                                    />
                                </Link>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductSection;
