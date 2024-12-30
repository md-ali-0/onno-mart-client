"use client";

import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import Link from "next/link";
import { FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BrowseByCategory: FC = () => {
    const { data, isLoading } = useGetAllCategoriesQuery(undefined);

    const breakpoints = {
        0: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 4, spaceBetween: 24 },
        768: { slidesPerView: 5, spaceBetween: 24 },
        1024: { slidesPerView: 6, spaceBetween: 24 },
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <section className="my-10 sm:my-14">
                    <div className="container px-4 lg:px-0">
                        <h2 className="text-2xl font-bold mb-4">
                            Browse By Category
                        </h2>

                        <Swiper
                            dir="ltr"
                            speed={1000}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="navigate-swiper"
                            breakpoints={breakpoints}
                        >
                            {data?.data?.map((category) => (
                                <SwiperSlide key={category.id}>
                                    <Link
                                        href={`/products?categoryId=${category.slug}`}
                                    >
                                        <div
                                            className={`flex items-center justify-center h-28 md:h-36 text-center text-lg font-semibold capitalize text-slate-700 shadow border transition-transform duration-300 hover:scale-105 hover:text-primary bg-primary/10 my-5`}
                                        >
                                            {category.name}
                                        </div>
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
