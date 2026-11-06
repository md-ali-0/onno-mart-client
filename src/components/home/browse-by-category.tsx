import { getCategories } from "@/lib/get-categories";
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
                    title="Shop by category"
                    href="/products"
                    linkLabel="View all categories"
                />

                <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-4 sm:px-0">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="w-[31%] shrink-0 snap-start sm:w-[22%] md:w-[16.5%] lg:w-[15.4%]"
                        >
                            <Link
                                href={`/products?categoryId=${category.slug}`}
                                className="group flex flex-col items-center gap-2.5"
                            >
                                <span className="relative aspect-square w-full overflow-hidden rounded-xl bg-accent">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 32vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    ) : null}
                                </span>
                                <span className="w-full truncate text-center text-[12px] font-semibold transition-colors group-hover:text-primary">
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
