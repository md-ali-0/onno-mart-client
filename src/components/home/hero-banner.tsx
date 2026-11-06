import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
    "https://res.cloudinary.com/dy8ef1ngb/image/upload/v1734151072/1_nqe7tw.png";

const facts = [
    { term: "Shops", detail: "5 verified" },
    { term: "Delivery", detail: "24–48 hours" },
    { term: "Returns", detail: "7 days" },
];

export default function HeroBanner() {
    return (
        <section className="band-tint border-b">
            <div className="container-page">
                <div className="grid gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-20">
                    <div>
                        <p className="eyebrow">OnnoMart — Dhaka, since 2024</p>

                        <h1 className="mt-5 max-w-[13ch] font-display text-[46px] leading-[0.92] tracking-[-0.03em] sm:text-[64px] lg:text-[78px]">
                            Fewer, better things.
                        </h1>

                        <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.85] text-muted-foreground">
                            A considered edit of electronics, clothing and
                            homeware from five verified shops. Chosen for how
                            they last, not for how they sell.
                        </p>

                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <Link href="/products" className="btn-ink">
                                Shop the edit
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                            </Link>
                            <Link href="/flash-sale" className="btn-line">
                                Private sale
                            </Link>
                        </div>

                        <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-6">
                            {facts.map((fact) => (
                                <div key={fact.term}>
                                    <dt className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                        {fact.term}
                                    </dt>
                                    <dd className="mt-1.5 text-[12px] font-medium">
                                        {fact.detail}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div>
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface">
                            <Image
                                src={HERO_IMAGE}
                                alt="A shopper carrying bags from OnnoMart"
                                fill
                                priority
                                sizes="(min-width: 1024px) 42vw, 92vw"
                                className="object-contain object-bottom p-6 sm:p-10"
                            />
                        </div>
                        <p className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                            <span>The autumn edit</span>
                            <span>01 / 04</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
