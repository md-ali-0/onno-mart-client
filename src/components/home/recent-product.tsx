import { getRecentProducts } from "@/lib/get-products";
import ProductCard from "../product/product-card";
import SectionHeader from "../shared/section-header";

/** Server-rendered so newly listed products are in the HTML for crawlers. */
export default async function RecentProducts() {
    const products = await getRecentProducts(4);

    if (products.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    title="New arrivals"
                    href="/products"
                    linkLabel="View all"
                />
                <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
