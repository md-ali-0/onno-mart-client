import bannerBg from "@/assets/banner/hero-bg.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCategories } from "@/lib/get-categories";
import { DollarSign, HeadphonesIcon, Truck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export function SkeletonList() {
    return <div>{[...Array(10)].map((item,idx)=><Skeleton className="bg-gray-300 w-36 h-5 mx-2.5" key={idx}/>)}</div>;
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
                        <div className="h-[380px] overflow-y-auto category-scroll">
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
                                SAVE NOW - 30-50% OFF
                            </Button>
                        </div>
                    </Card>
                </div>
                <div className="flex-1 h-full">
                    <div
                        className="flex items-center rounded-lg bg-primary/20 px-6 py-16 text-white md:px-12 md:min-h-[485px]"
                        style={{ backgroundImage: `url(${bannerBg.src})` }}
                    >
                        <div className="text-center md:w-1/2 mb-8 md:mb-0 mx-auto">
                            <p className="text-gray-700 text-lg">
                                SAVE NOW. STRESS LESS.
                            </p>
                            <h1 className="text-6xl font-bold text-gray-900 mt-2">
                                30-50%
                                <span className="text-primary">OFF</span>
                            </h1>
                            <p className="text-2xl font-semibold text-gray-800 mt-2">
                                PRETTY MUCH EVERYTHING
                            </p>
                            <p className="text-gray-600 mt-4">
                                Limited Time Only
                            </p>
                            <button className="mt-6 px-6 py-3 bg-gray-900 text-white text-lg font-semibold rounded">
                                Shop Now
                            </button>
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
