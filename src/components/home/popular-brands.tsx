import { getBrands } from "@/lib/get-brands";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/** Brand strip: names set as wordmarks inside one bordered card. */
export default async function PopularBrands() {
    const brands = await getBrands();

    if (brands.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    title="Top brands"
                    href="/products"
                    linkLabel="View all"
                />

                <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-5">
                    {brands.map((brand) => (
                        <li key={brand.id} className="bg-card">
                            <Link
                                href={`/products?brandId=${brand.slug}`}
                                className="flex h-16 items-center justify-center px-3 text-[14px] font-bold uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:text-primary"
                            >
                                <span className="truncate">{brand.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
