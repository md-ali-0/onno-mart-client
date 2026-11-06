import { getRankedProducts } from "@/lib/get-products";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../shared/section-header";
import ProductTabs from "./product-tabs";

/**
 * Server component. The old version loaded two Redux queries on the client and
 * rendered a giant animated gradient banner, so neither the products nor the
 * offer copy ever reached the HTML.
 */
export default async function ProductListing() {
    const [bestSelling, topRated] = await Promise.all([
        getRankedProducts("best-selling", 4),
        getRankedProducts("top-rated", 4),
    ]);

    return (
        <>
            {/* A printed offer band: clay field, serif headline, letter-spaced code. */}
            <section className="border-y border-primary/30 bg-primary text-primary-foreground">
                <div className="container-page">
                    <div className="grid items-center gap-6 py-9 sm:grid-cols-[1fr_auto] sm:gap-10 sm:py-12">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                                Winter offer · while stocks last
                            </p>
                            <h2 className="mt-2.5 max-w-[22ch] font-display text-[28px] font-medium leading-[1.05] tracking-[-0.02em] sm:text-[36px]">
                                Twenty-five percent off your first order.
                            </h2>
                            <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-primary-foreground/85">
                                Use the code{" "}
                                <span className="border border-primary-foreground/40 px-1.5 py-0.5 text-[11px] font-semibold tracking-[0.14em]">
                                    WINTER25
                                </span>{" "}
                                at checkout, on every item from our verified
                                shops.
                            </p>
                        </div>

                        <Link
                            href="/products"
                            className="inline-flex w-fit items-center gap-2 border border-primary-foreground/45 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-primary-foreground hover:text-primary"
                        >
                            Shop the offer
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-page">
                    <SectionHeader
                        index="03"
                        eyebrow="Customer favourites"
                        title="Most loved"
                        description="The items people keep coming back for."
                        href="/products"
                        linkLabel="All products"
                    />
                    <ProductTabs
                        bestSelling={bestSelling}
                        topRated={topRated}
                    />
                </div>
            </section>
        </>
    );
}
