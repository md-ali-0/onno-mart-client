"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";

// Define the category type
interface Category {
    id: number;
    name: string;
    slug: string;
    thumb: string;
}

const BrowseByCategory: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);

    // Refs for custom navigation buttons
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    // Dummy category data
    useEffect(() => {
        setLoading(true);
        const dummyCategories: Category[] = [
            {
                id: 1,
                name: "Electronics",
                slug: "electronics",
                thumb: "https://demo.shopperz.xyz/storage/40/conversions/men-thumb.png",
            },
            {
                id: 2,
                name: "Fashion",
                slug: "fashion",
                thumb: "https://demo.shopperz.xyz/storage/41/conversions/clothing-thumb.png",
            },
            {
                id: 3,
                name: "Books",
                slug: "books",
                thumb: "https://demo.shopperz.xyz/storage/42/conversions/hoodies_&_sweatshirts-thumb.png",
            },
            {
                id: 4,
                name: "Sports",
                slug: "sports",
                thumb: "https://demo.shopperz.xyz/storage/44/conversions/pants_&_tights-thumb.png",
            },
            {
                id: 5,
                name: "Furniture",
                slug: "furniture",
                thumb: "https://demo.shopperz.xyz/storage/40/conversions/men-thumb.png",
            },
            {
                id: 6,
                name: "Toys",
                slug: "toys",
                thumb: "https://demo.shopperz.xyz/storage/40/conversions/men-thumb.png",
            },
            {
                id: 7,
                name: "Sports",
                slug: "sports",
                thumb: "https://demo.shopperz.xyz/storage/44/conversions/pants_&_tights-thumb.png",
            },
            {
                id: 8,
                name: "Furniture",
                slug: "furniture",
                thumb: "https://demo.shopperz.xyz/storage/40/conversions/men-thumb.png",
            },
            {
                id: 9,
                name: "Toys",
                slug: "toys",
                thumb: "https://demo.shopperz.xyz/storage/40/conversions/men-thumb.png",
            },
        ];
        setCategories(dummyCategories);
        setLoading(false);
    }, []);

    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 4, spaceBetween: 24 },
        768: { slidesPerView: 5, spaceBetween: 24 },
        1024: { slidesPerView: 6, spaceBetween: 24 },
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <section className="my-10 sm:my-14">
                    <div className="container relative">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-10">
                            Browse by Categories
                        </h2>

                        {/* Custom navigation buttons */}
                        <div className="absolute top-0 right-0 flex gap-2">
                            <button
                                ref={prevRef}
                                className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full"
                            >
                                <ArrowLeft />
                            </button>
                            <button
                                ref={nextRef}
                                className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full"
                            >
                                <ArrowRight />
                            </button>
                        </div>

                        <Swiper
                            dir="ltr"
                            speed={1000}
                            loop={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            } as NavigationOptions} // Explicitly cast as Navigation
                            onBeforeInit={(swiper) => {
                                // Pass navigation elements to Swiper
                                if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="navigate-swiper"
                            breakpoints={breakpoints}
                        >
                            {categories.map((category) => (
                                <SwiperSlide
                                    key={category.id}
                                    className="mobile:!w-24"
                                >
                                    <Link
                                        href={"/frontend/product"}
                                        className="w-full rounded-2xl shadow-xs group"
                                    >
                                        <img
                                            className="w-full block rounded-tl-2xl rounded-tr-2xl"
                                            src={category.thumb}
                                            alt={category.name}
                                        />
                                        <span className="text-sm sm:text-xl font-medium capitalize text-center py-2 px-3 overflow-hidden whitespace-nowrap text-ellipsis block rounded-bl-2xl rounded-br-2xl group-hover:text-primary">
                                            {category.name}
                                        </span>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BrowseByCategory;
