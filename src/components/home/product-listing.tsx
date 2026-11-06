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
        <section className="section pt-0">
            <div className="container-page space-y-12 sm:space-y-16">
                {/* Seasonal offer — one warm moment between the white sections. */}
                <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground sm:px-10 sm:py-10">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-28 right-28 h-56 w-56 rounded-full bg-white/10"
                    />
                    <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/80">
                                Seasonal offer
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                                Hurry up — 25% off
                            </h2>
                            <p className="mt-2 max-w-lg text-sm text-primary-foreground/90 sm:text-base">
                                Use code{" "}
                                <span className="rounded-md bg-white/20 px-2 py-0.5 font-semibold tracking-wide">
                                    WINTER25
                                </span>{" "}
                                at checkout on every item from our verified
                                shops.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
                        >
                            Shop the offer
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                </div>

                <div>
                    <SectionHeader
                        eyebrow="Customer favourites"
                        title="Most loved products"
                        description="The items people keep coming back for."
                        href="/products"
                        linkLabel="All products"
                    />
                    <ProductTabs
                        bestSelling={bestSelling}
                        topRated={topRated}
                    />
                </div>
            </div>
        </section>
    );
}
