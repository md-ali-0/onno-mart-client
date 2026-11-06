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
                                className="group flex flex-col gap-3"
                            >
                                <span className="relative aspect-[3/4] w-full overflow-hidden bg-surface">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 15vw, (min-width: 640px) 22vw, 32vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                    ) : null}
                                </span>
                                <span className="block border-t pt-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition-colors group-hover:text-primary">
                                    <span className="block truncate">{category.name}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
