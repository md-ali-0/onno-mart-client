import bannerBg from "@/assets/banner/hero-bg.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategories } from "@/lib/get-categories";
import { DollarSign, HeadphonesIcon, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export function SkeletonList() {
    return (
        <div>
            {[...Array(10)].map((item, idx) => (
                <Skeleton className="bg-gray-300 w-36 h-5 mx-2.5" key={idx} />
            ))}
        </div>
    );
}

export default async function HeroBanner() {
    const categories = await getCategories();

    return (
        <section className="container px-4 lg:px-0 sm:mb-20">
            <div className="flex gap-6 py-6">
                <div className="hidden w-64 shrink-0 md:block h-fit">
                    <Card className="h-full">
                        <div className="py-2.5 px-3 font-semibold underline-offset-4 hover:underline transform transition-all hover:text-primary duration-300">
                            Top Categories
                        </div>
                        <div className="h-[400px] overflow-y-auto category-scroll">
                            <div className="space-y-1 p-2">
                                <Suspense fallback={<SkeletonList />}>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <Link
                                                key={category?.id}
                                                href={`/products?category=${category?.slug}`}
                                                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                            >
                                                <span className="mr-1">
                                                    {category?.icon}
                                                </span>
                                                {category?.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p>No Category Available</p>
                                    )}
                                </Suspense>
                            </div>
                        </div>
                        <div className="py-2.5 px-3">
                            <Button
                                className="w-full bg-primary text-primary-foreground"
                                variant="default"
                            >
                                SAVE NOW - 10-25% OFF
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="flex-1 h-full">
                    <div
                        className="flex items-center rounded-lg bg-primary/20 px-6 py-16 text-white md:px-12 md:min-h-[485px]"
                        style={{ backgroundImage: `url(${bannerBg.src})` }}
                    >
                        <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                            <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                                <span className="bg-primary/50 px-2 py-0.5 rounded-xl">WINTER25</span>
                                <p className="text-4xl font-bold md:text-7xl text-primary">
                                    25% OFF
                                </p>
                                <p className="text-4xl text-center text-black font-bold md:text-7xl">
                                    WINTER SALE
                                </p>
                                <p className="mt-2 text-sm text-slate-800 md:text-lg">
                                    For limited time only!
                                </p>
                                <Link href={'/products'} className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">
                                    Shop Now
                                </Link>
                            </div>
                            <div className="order-1 bg-primary/40 rounded-xl lg:order-2">
                                <Image
                                    className="h-80 w-80 object-cover lg:w-[480px] lg:h-[380px]"
                                    src="https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png"
                                    alt=""
                                    width={450}
                                    height={500}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
