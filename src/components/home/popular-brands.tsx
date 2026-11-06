import { getBrands } from "@/lib/get-brands";
import Link from "next/link";
import SectionHeader from "../shared/section-header";

/** Brand strip: serif wordmarks in a hairline grid. */
export default async function PopularBrands() {
    const brands = await getBrands();

    if (brands.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    title="The houses we keep"
                    href="/products"
                    linkLabel="All brands"
                />

                <ul className="grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-5">
                    {brands.map((brand) => (
                        <li key={brand.id} className="border-b border-r">
                            <Link
                                href={`/products?brandId=${brand.slug}`}
                                className="flex h-20 items-center justify-center px-3 font-display text-[17px] text-muted-foreground transition-colors hover:text-foreground"
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
