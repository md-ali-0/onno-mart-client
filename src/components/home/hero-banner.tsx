import { ArrowRight, BadgeCheck, Headphones, RotateCcw, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
    "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png";

const trustPoints = [
    {
        icon: Truck,
        title: "Delivery in 24–48h",
        body: "Inside Dhaka, 2–4 days nationwide.",
    },
    {
        icon: BadgeCheck,
        title: "Cash on delivery",
        body: "Or pay online with SSLCommerz.",
    },
    {
        icon: RotateCcw,
        title: "7-day returns",
        body: "Unused items, no arguing needed.",
    },
    {
        icon: Headphones,
        title: "Support that replies",
        body: "Real people, 9am–9pm.",
    },
];

export default function HeroBanner() {
    return (
        <section className="pb-12 pt-6 sm:pb-16 sm:pt-10">
            <div className="container-page">
                <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent via-background to-background">
                    <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-6 lg:p-14">
                        <div>
                            <p className="eyebrow">Multi-vendor marketplace</p>
                            <h1 className="mt-3 max-w-xl text-3xl font-semibold leading-[1.1] tracking-tightest sm:text-4xl lg:text-5xl">
                                Online shopping in Bangladesh, without the guesswork.
                            </h1>
                            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                                Electronics, fashion, home, beauty and grocery from
                                verified shops. Compare before you buy, pay when it
                                arrives, return it if it is not right.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    Start shopping
                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                </Link>
                                <Link
                                    href="/flash-sale"
                                    className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                                >
                                    Today&apos;s deals
                                </Link>
                            </div>

                            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                                {[
                                    ["5", "verified shops"],
                                    ["24", "products listed"],
                                    ["3", "payment methods"],
                                ].map(([value, label]) => (
                                    <div key={label}>
                                        <dt className="sr-only">{label}</dt>
                                        <dd>
                                            <span className="price text-xl">{value}</span>
                                            <span className="ml-1.5 text-xs text-muted-foreground">
                                                {label}
                                            </span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none">
                            <Image
                                src={HERO_IMAGE}
                                alt="Featured products on OnnoMart"
                                fill
                                priority
                                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 90vw"
                                className="object-contain drop-shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {trustPoints.map(({ icon: Icon, title, body }) => (
                        <li
                            key={title}
                            className="flex items-start gap-3 rounded-xl border bg-card p-4"
                        >
                            <Icon
                                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                                aria-hidden
                            />
                            <div>
                                <p className="text-sm font-semibold">{title}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {body}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}