"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, HeadphonesIcon, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function HeroBannerSlider() {
    const banners = [
        {
            bg: "/assets/banner/hero-bg.png",
            title: "WINTER SALE",
            discount: "25% OFF",
            code: "WINTER25",
            description: "For limited time only!",
            link: "/products",
            linkText: "Shop Now",
            image: "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png",
            bgColor: "bg-primary/20",
            textColor: "text-primary",
        },
        {
            bg: "/assets/banner/hero-bg.png",
            title: "SUMMER COLLECTION",
            discount: "40% OFF",
            code: "SUMMER40",
            description: "Explore our summer collection!",
            link: "/summer-collection",
            linkText: "Discover Now",
            image: "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png",
            bgColor: "bg-red-100",
            textColor: "text-red-500",
        },
        {
            bg: "/assets/banner/hero-bg.png",
            title: "NEW ARRIVALS",
            discount: "UP TO 30% OFF",
            code: "NEW30",
            description: "Check out the latest trends!",
            link: "/new-arrivals",
            linkText: "Shop Latest",
            image: "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png",
            bgColor: "bg-blue-100",
            textColor: "text-blue-500",
        },
    ];

    return (
        <section className="container px-4 lg:px-0 sm:mb-20">
            <div className="py-5">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000 }}
                    speed={1000}
                    pagination={{ clickable: true }}
                    loop
                    className="rounded-lg"
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`flex items-center rounded-lg px-6 py-16 md:px-12 md:min-h-[485px] ${banner.bgColor}`}
                                style={{ backgroundImage: `url(${banner.bg})` }}
                            >
                                <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                                    <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                                        <span
                                            className={`px-2 py-0.5 rounded-xl ${banner.textColor}`}
                                        >
                                            {banner.code}
                                        </span>
                                        <p
                                            className={`text-4xl font-bold md:text-7xl ${banner.textColor}`}
                                        >
                                            {banner.discount}
                                        </p>
                                        <p className="text-4xl text-center text-black font-bold md:text-7xl">
                                            {banner.title}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-800 md:text-lg">
                                            {banner.description}
                                        </p>
                                        <Link
                                            href={banner.link}
                                            className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800"
                                        >
                                            {banner.linkText}
                                        </Link>
                                    </div>
                                    <div className="order-1 rounded-xl lg:order-2">
                                        <Image
                                            className="h-80 w-80 object-cover lg:w-[480px] lg:h-[380px]"
                                            src={banner.image}
                                            alt={banner.title}
                                            width={450}
                                            height={500}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Features Section */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.title} className="p-4">
                        <div className="flex items-center gap-4">
                            <feature.icon className="h-8 w-8 text-primary" />
                            <div>
                                <div className="font-semibold">
                                    {feature.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {feature.description}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

const features = [
    {
        title: "FREE SHIPPING & RETURN",
        description: "Free shipping on all orders over $99.",
        icon: Truck,
    },
    {
        title: "MONEY BACK GUARANTEE",
        description: "100% money back guarantee.",
        icon: DollarSign,
    },
    {
        title: "ONLINE SUPPORT 24/7",
        description: "Lorem ipsum dolor sit amet.",
        icon: HeadphonesIcon,
    },
];
