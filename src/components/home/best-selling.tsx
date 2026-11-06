import { getRankedProducts } from "@/lib/get-products";
import ProductCard from "../product/product-card";
import SectionHeader from "../shared/section-header";

export default async function BestSelling() {
    const products = await getRankedProducts("best-selling", 4);

    if (products.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    title="Best selling"
                    href="/products"
                    linkLabel="View all"
                />
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
