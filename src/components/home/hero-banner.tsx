import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
    "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png";

const meta = [
    { title: "Delivery", body: "24–48h in Dhaka, 2–4 days nationwide." },
    { title: "Payment", body: "Cash on delivery, or pay with SSLCommerz." },
    { title: "Returns", body: "Seven days on unused items, no arguing." },
    { title: "Support", body: "Real people, 9am to 9pm, every day." },
];

/**
 * Editorial hero: type on paper, a still-life plate on the right, and a plain
 * meta strip underneath. No gradient panel, no floating badge cluster.
 */
export default function HeroBanner() {
    return (
        <section className="border-b">
            <div className="container-page">
                <div className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16 lg:py-16">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="label-caps">Dhaka · since 2024</span>
                            <span aria-hidden className="h-px w-8 bg-border" />
                            <span className="label-caps">5 shops</span>
                        </div>

                        <h1 className="mt-6 max-w-[13ch] font-display text-[40px] font-medium leading-[0.95] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]">
                            Shopping that
                            <span className="text-primary"> respects </span>
                            your time.
                        </h1>

                        <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-muted-foreground">
                            Electronics, fashion, home, beauty and grocery from
                            verified shops. Compare before you buy, pay when it
                            arrives, and send it back if it is not right.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-foreground"
                            >
                                Start shopping
                                <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                            <Link
                                href="/flash-sale"
                                className="link-underline text-[13px] font-medium"
                            >
                                See today&apos;s deals
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
                            <Image
                                src={HERO_IMAGE}
                                alt="A selection of products sold on OnnoMart"
                                fill
                                priority
                                sizes="(min-width: 1024px) 44vw, 90vw"
                                className="object-contain p-6 sm:p-10"
                            />
                        </div>
                        <p className="mt-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            <span>Featured selection</span>
                            <span>Gadget House · Dhaka</span>
                        </p>
                    </div>
                </div>

                <dl className="grid grid-cols-2 gap-y-6 border-t py-6 sm:grid-cols-4">
                    {meta.map((item, index) => (
                        <div
                            key={item.title}
                            className={cn(
                                "sm:px-6",
                                index === 0 && "sm:pl-0",
                                index > 0 && "sm:border-l"
                            )}
                        >
                            <dt className="label-caps">{item.title}</dt>
                            <dd className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                                {item.body}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
