import { getCategories } from "@/lib/get-categories";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/**
 * Category cards: name, a couple of entry links and a circular arrow, with the
 * category image on the right. Mirrors the reference template's panel.
 */
export default async function BrowseByCategory() {
    const categories = await getCategories();

    if (categories.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    title="Shop by category"
                    href="/products"
                    linkLabel="View all categories"
                />

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <Link
                                href={`/products?categoryId=${category.slug}`}
                                className="group flex h-full items-center gap-3 rounded-lg border bg-card p-4 transition-shadow hover:shadow-card"
                            >
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-[16px] font-semibold transition-colors group-hover:text-primary">
                                        {category.name}
                                    </span>
                                    <span className="mt-1.5 block text-[13px] leading-relaxed text-muted-foreground">
                                        New arrivals
                                        <br />
                                        Best sellers
                                        <br />
                                        Under ৳1,000
                                    </span>
                                </span>

                                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt=""
                                            fill
                                            sizes="64px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : null}
                                </span>

                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
