import { getBrands } from "@/lib/get-brands";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/**
 * A typographic index of the brands we stock. The old version showed one
 * placeholder image per brand inside a bordered card, which looked like a logo
 * wall built from stock art. Names set in the display face read better and cost
 * nothing to load.
 */
export default async function PopularBrands() {
    const brands = await getBrands();

    if (brands.length === 0) return null;

    return (
        <section className="section">
            <div className="container-page">
                <SectionHeader
                    index="04"
                    eyebrow="Stockists"
                    title="Brands we keep"
                    href="/products"
                    linkLabel="Browse all"
                />

                <ul className="grid grid-cols-2 gap-y-0 border-t sm:grid-cols-3 lg:grid-cols-5">
                    {brands.map((brand) => (
                        <li
                            key={brand.id}
                            className="border-b sm:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(5n)]:border-r-0"
                        >
                            <Link
                                href={`/products?brandId=${brand.slug}`}
                                className="group flex items-baseline justify-between gap-2 py-4 pr-4 transition-colors hover:text-primary"
                            >
                                <span className="truncate font-display text-[17px]">
                                    {brand.name}
                                </span>
                                <ArrowUpRight
                                    aria-hidden
                                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
