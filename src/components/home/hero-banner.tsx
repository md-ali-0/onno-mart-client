import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
    "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png";

export default function HeroBanner() {
    return (
        <section className="band-tint border-b">
            <div className="container-page">
                <div className="grid items-center gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-12">
                    <div>
                        <p className="eyebrow">Online shopping destination</p>

                        <h1 className="mt-3 max-w-[15ch] text-[32px] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-[42px] lg:text-[50px]">
                            Shopping that
                            <span className="text-primary"> respects </span>
                            your time.
                        </h1>

                        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                            Top-quality products, honest prices, and a checkout
                            that does not waste your evening.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <Link
                                href="/products"
                                className="inline-flex h-11 items-center gap-2 rounded-lg bg-navy px-6 text-[13px] font-semibold text-navy-foreground transition-colors hover:bg-navy/90"
                            >
                                Shop now
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                            <Link
                                href="/flash-sale"
                                className="inline-flex h-11 items-center rounded-lg border border-border bg-card px-6 text-[13px] font-semibold transition-colors hover:border-navy/30 hover:bg-secondary"
                            >
                                Explore deals
                            </Link>
                        </div>

                        <p className="mt-6 flex items-center gap-2 text-[12px] text-muted-foreground">
                            <BadgeCheck className="h-4 w-4 text-primary" aria-hidden />
                            Verified shops · cash on delivery · 7-day returns
                        </p>
                    </div>

                    <div className="relative">
                        <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden rounded-2xl sm:aspect-[5/4]">
                            <Image
                                src={HERO_IMAGE}
                                alt="A shopper with bags from OnnoMart"
                                fill
                                priority
                                sizes="(min-width: 1024px) 44vw, 90vw"
                                className="object-contain object-bottom"
                            />
                        </div>

                        <div className="absolute bottom-3 left-0 hidden items-center gap-2 rounded-xl border bg-card/95 px-3 py-2 shadow-card sm:flex">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-primary">
                                <Sparkles className="h-4 w-4" aria-hidden />
                            </span>
                            <span className="text-[11px] font-semibold leading-tight">
                                25% off
                                <span className="block font-normal text-muted-foreground">
                                    first order
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
