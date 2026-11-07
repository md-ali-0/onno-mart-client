import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const IMAGE =
    "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1400&q=80";

/** Editorial split: type on one side, a single photograph on the other. */
export default function PromoBanner() {
    return (
        <section className="section">
            <div className="container-page">
                <div className="grid items-stretch border bg-card sm:grid-cols-2">
                    <div className="flex flex-col justify-center p-8 sm:p-12">
                        <p className="eyebrow">New in — electronics</p>
                        <h2 className="mt-4 max-w-[14ch] font-display text-[32px] leading-[1.02] tracking-[-0.02em] sm:text-[42px]">
                            Tools for quieter work.
                        </h2>
                        <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
                            Laptops, screens and accessories chosen for how they
                            hold up, not for how they read on a spec sheet.
                        </p>
                        <Link
                            href="/category/electronics"
                            className="btn-line mt-8 w-fit"
                        >
                            Shop electronics
                            <ArrowRight className="h-3 w-3" aria-hidden />
                        </Link>
                    </div>

                    <div className="relative min-h-[240px] sm:min-h-[400px]">
                        <Image
                            src={IMAGE}
                            alt="A laptop on a desk"
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
