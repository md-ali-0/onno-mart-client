import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const IMAGE =
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80";

/** Full-width promotional card between the two product rows. */
export default function PromoBanner() {
    return (
        <section className="section">
            <div className="container-page">
                <div className="grid items-center overflow-hidden rounded-2xl border bg-accent sm:grid-cols-2">
                    <div className="p-6 sm:p-9">
                        <p className="eyebrow">New collection</p>
                        <h2 className="mt-2 max-w-[16ch] text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-[30px]">
                            Tech essentials for a smarter life.
                        </h2>
                        <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                            Lighter laptops, sharper screens and accessories
                            that actually last.
                        </p>
                        <Link
                            href="/products?categoryId=electronics"
                            className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-navy px-5 text-[12px] font-semibold text-navy-foreground transition-colors hover:bg-navy/90"
                        >
                            Shop now
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                    </div>

                    <div className="relative h-48 sm:h-full sm:min-h-[260px]">
                        <Image
                            src={IMAGE}
                            alt="Laptop and accessories on a desk"
                            fill
                            sizes="(min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
