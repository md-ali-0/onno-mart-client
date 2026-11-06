import { getSaleProducts } from "@/lib/get-products";
import { Product } from "@/types";
import ProductCard from "../product/product-card";
import SectionHeader from "../shared/section-header";

const FlashSale = async () => {
    const products = await getSaleProducts();
    const discounted = products.filter((product) => product.discount > 0);

    if (discounted.length === 0) return null;

    return (
        <section className="section">
            <div className="container-page">
                <SectionHeader
                    index="02"
                    eyebrow="Limited time"
                    title="On sale this week"
                    description="Discounts that will not wait for payday."
                    href="/flash-sale"
                    linkLabel="See all deals"
                />

                <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
                    {discounted.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;