import { discountedPrice, formatPrice, savingsPercent } from "@/lib/format";
import { getRankedProducts } from "@/lib/get-products";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TONES = ["#EDE4D2", "#E3EAF8"];

/** Two wide promotional cards, matching the template's hero slider. */
export default async function HeroBanner() {
    const products = await getRankedProducts("best-selling", 2);

    if (products.length === 0) return null;

    return (
        <section className="py-6">
            <div className="container-page">
                <div className="grid gap-5 lg:grid-cols-2">
                    {products.map((product, index) => {
                        const price = discountedPrice(product);
                        const saved = savingsPercent(product);

                        return (
                            <article
                                key={product.id}
                                className="relative overflow-hidden rounded-2xl"
                                style={{ backgroundColor: TONES[index % TONES.length] }}
                            >
                                <div className="flex items-center justify-between gap-4 p-6 sm:p-8">
                                    <div className="min-w-0 max-w-[58%]">
                                        <p className="text-[13px] text-muted-foreground">
                                            {index === 0
                                                ? "Exclusive offer going"
                                                : "Limited weekend deal"}
                                        </p>
                                        {index === 0 ? (
                                            <h1 className="mt-1.5 line-clamp-2 text-[22px] font-bold leading-[1.15] sm:text-[26px]">
                                                {product.name}
                                            </h1>
                                        ) : (
                                            <h2 className="mt-1.5 line-clamp-2 text-[22px] font-bold leading-[1.15] sm:text-[26px]">
                                                {product.name}
                                            </h2>
                                        )}

                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            <span className="price-strike">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="text-[20px] font-bold text-primary">
                                                {formatPrice(price)}
                                            </span>
                                            {saved > 0 && (
                                                <span className="rounded-full bg-sale px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sale-foreground">
                                                    Save {saved}%
                                                </span>
                                            )}
                                        </div>

                                        <Link
                                            href={`/product/${product.slug}`}
                                            className="mt-6 inline-flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-primary text-[8px] font-semibold uppercase leading-none tracking-wide text-primary-foreground transition-transform hover:scale-105"
                                        >
                                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                            Shop now
                                        </Link>
                                    </div>

                                    <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl sm:h-52 sm:w-52">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.name}
                                            fill
                                            priority={index === 0}
                                            sizes="(min-width: 640px) 220px, 160px"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
