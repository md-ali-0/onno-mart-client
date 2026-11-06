import { getBrands } from "@/lib/get-brands";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/**
 * Server-rendered brand strip. Swiper used to carry this section; a
 * scroll-snap row does the same job and keeps the markup crawlable.
 */
export default async function PopularBrands() {
    const brands = await getBrands();

    if (brands.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    eyebrow="Trusted names"
                    title="Popular brands"
                    href="/products"
                    linkLabel="Browse all"
                />

                <ul className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-3 sm:px-0">
                    {brands.map((brand) => (
                        <li
                            key={brand.id}
                            className="w-28 shrink-0 snap-start sm:w-32"
                        >
                            <Link
                                href={`/products?brandId=${brand.slug}`}
                                className="group flex h-full flex-col items-center gap-2 rounded-xl border bg-card p-3 transition-colors hover:border-foreground/20"
                            >
                                <span className="relative h-14 w-full">
                                    {brand.image ? (
                                        <Image
                                            src={brand.image}
                                            alt=""
                                            fill
                                            sizes="128px"
                                            className="object-contain"
                                        />
                                    ) : null}
                                </span>
                                <span className="w-full truncate text-center text-xs font-medium capitalize text-muted-foreground group-hover:text-foreground">
                                    {brand.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}