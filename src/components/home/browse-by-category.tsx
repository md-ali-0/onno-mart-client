import { getCategories } from "@/lib/get-categories";
import { cn } from "@/lib/utils";
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
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    eyebrow="Shop by department"
                    title="Browse by category"
                    description={`${categories.length} departments, one cart.`}
                    href="/products"
                    linkLabel="All products"
                />

                <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-4 sm:px-0">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="w-[42%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-[15.6%]"
                        >
                            <Link
                                href={`/products?categoryId=${category.slug}`}
                                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-foreground/20"
                            >
                                <span
                                    className={cn(
                                        "relative aspect-square w-full overflow-hidden rounded-lg bg-muted"
                                    )}
                                >
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 28vw, 40vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : null}
                                </span>
                                <span className="w-full truncate text-center text-sm font-medium">
                                    {category.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}