"use client";

import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavigationOptions } from "swiper/types";
import ProductCard from "./product-card";

const RelatedProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
    const { data, isLoading } = useGetAllProductsQuery([
        {
            name: "categoryId",
            value: categoryId,
        },
    ]);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const breakpoints = {
        0: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 24 },
        768: { slidesPerView: 3, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <section className="my-10 sm:my-14">
                    <div className="container px-4 lg:px-0 relative">
                        <h2 className="text-2xl font-bold mb-4">
                            Related Products
                        </h2>

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
                            navigation={
                                {
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                } as NavigationOptions
                            }
                            onBeforeInit={(swiper) => {
                                if (
                                    swiper.params.navigation &&
                                    typeof swiper.params.navigation !==
                                        "boolean"
                                ) {
                                    swiper.params.navigation.prevEl =
                                        prevRef.current;
                                    swiper.params.navigation.nextEl =
                                        nextRef.current;
                                }
                            }}
                            modules={[Navigation, Pagination, Autoplay]}
                            className="navigate-swiper"
                            breakpoints={breakpoints}
                        >
                            {data?.data?.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            )}
        </div>
    );
};

export default RelatedProducts;
