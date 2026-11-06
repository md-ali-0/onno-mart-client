import { getRecentProducts } from "@/lib/get-products";
import ProductCard from "../product/product-card";
import SectionHeader from "../shared/section-header";

/** Server-rendered so newly listed products are in the HTML for crawlers. */
export default async function RecentProducts() {
    const products = await getRecentProducts(8);

    if (products.length === 0) return null;

    return (
        <section className="section">
            <div className="container-page">
                <SectionHeader
                    index="05"
                    eyebrow="Just landed"
                    title="New in the shops"
                    description="Freshly added by our verified shops."
                    href="/products"
                    linkLabel="Show more"
                />

                <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
