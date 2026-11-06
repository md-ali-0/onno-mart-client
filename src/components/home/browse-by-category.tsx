import { getCategories } from "@/lib/get-categories";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/**
 * Server component on purpose: the category strip is part of the first screen,
 * so it belongs in the HTML. A scroll-snap row replaces the swiper carousel and
 * drops ~40 kB of JavaScript from the home bundle.
 */
export default async function BrowseByCategory() {
    const categories = await getCategories();

    if (categories.length === 0) return null;

    return (
        <section className="section">
            <div className="container-page">
                <SectionHeader
                    index="01"
                    eyebrow="Departments"
                    title="Browse by category"
                    description={`${categories.length} departments, one cart.`}
                    href="/products"
                    linkLabel="All products"
                />

                <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[15.4%]"
                        >
                            <Link
                                href={`/products?categoryId=${category.slug}`}
                                className="group block"
                            >
                                <span className="relative block aspect-[3/4] overflow-hidden bg-muted">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 28vw, 44vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                                        />
                                    ) : null}
                                </span>
                                <span className="mt-2.5 flex items-baseline justify-between gap-2 border-b pb-1.5">
                                    <span className="min-w-0 truncate font-display text-[15px]">
                                        {category.name}
                                    </span>
                                    <ArrowUpRight
                                        aria-hidden
                                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
