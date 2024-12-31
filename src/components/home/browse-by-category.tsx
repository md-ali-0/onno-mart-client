"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Category } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrowseByCategory() {
    const { data, isLoading } = useGetAllCategoriesQuery(undefined);
    const swiperRef = useRef<SwiperType>();

    const breakpoints = {
        0: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 3, spaceBetween: 24 },
        768: { slidesPerView: 4, spaceBetween: 24 },
        1024: { slidesPerView: 5, spaceBetween: 32 },
        1280: { slidesPerView: 6, spaceBetween: 32 },
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <h2 className="relative mb-[15px] text-2xl pb-[18px] before:w-[185px] before:bg-primary before:h-[2px] before:absolute before:-bottom-1 before:left-0 before:content-[''] font-bold text-gray-900">
                        Browse By Category
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="p-2 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-white transition-colors duration-200"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="p-2 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-white transition-colors duration-200"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
                    </div>
                ) : (
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation]}
                        breakpoints={breakpoints}
                        className="overflow-hidden py-3.5"
                    >
                        {data?.data?.map((category: Category) => (
                            <SwiperSlide key={category.id}>
                                <Link
                                    href={`/products?categoryId=${category.slug}`}
                                    className="block group"
                                >
                                    <div className="relative aspect-square rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                                        <div className="absolute inset-0 rounded-full p-8 transition-transform duration-300 group-hover:scale-105">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    fill
                                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary">
                                            {category.name}
                                        </h3>
                                        {/* <p className="text-sm text-gray-500">
                      ({category.itemCount || 0} items)
                    </p> */}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
}
