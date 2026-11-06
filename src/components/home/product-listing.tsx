import {
    getRankedProducts,
    getRecentProducts,
    getSaleProducts,
} from "@/lib/get-products";
import { Product } from "@/types";
import SectionHeader from "../shared/section-header";
import ProductTabs from "./product-tabs";

/** Trending products: server-fetched lists, one small client island for tabs. */
export default async function ProductListing() {
    const [recent, sale, topRated] = await Promise.all([
        getRecentProducts(8),
        getSaleProducts(),
        getRankedProducts("top-rated", 4),
    ]);

    const onSale = (sale as Product[])
        .filter((product) => product.discount > 0)
        .slice(0, 4);

    return (
        <section className="section">
            <div className="container-page">
                <SectionHeader
                    title="Trending products"
                    description="What shoppers in Dhaka are buying this week."
                    href="/products"
                    linkLabel="View all products"
                />
                <ProductTabs all={recent} onSale={onSale} topRated={topRated} />
            </div>
        </section>
    );
}
