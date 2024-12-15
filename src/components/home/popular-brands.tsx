"use client";

import { useGetAllBrandsQuery } from "@/redux/features/brand/brandApi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";

const PopularBrands: FC = () => {

    const { data, isLoading,} = useGetAllBrandsQuery(undefined);

    // Refs for custom navigation buttons
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

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
                    <div className="container px-4 lg:px-0 relative">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-10">
                            Popular Brands
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
                            {data?.data?.map((brand) => (
                                <SwiperSlide
                                    key={brand.id}
                                    className="mobile:!w-24 bg-white rounded-xl border shadow p-3"
                                >
                                    <Link
                                        href={"/brand/product"}
                                        
                                    >
                                        <Image
                                            width={200}
                                            height={150}
                                            className="w-auto mx-auto h-16 block rounded mb-3"
                                            src={brand.image}
                                            alt={brand.name}
                                        />
                                        <h3 className="font-medium capitalize text-center py-2 px-3 overflow-hidden whitespace-nowrap text-ellipsis block rounded-bl-2xl rounded-br-2xl group-hover:text-primary">
                                            {brand.name}
                                        </h3>
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

export default PopularBrands;
