import { getSaleProducts } from "@/lib/get-products";
import { Product } from "@/types";
import ProductCard from "../product/product-card";
import SectionHeader from "../shared/section-header";

const FlashSale = async () => {
    const products = await getSaleProducts();
    const discounted = products.filter((product) => product.discount > 0);

    if (discounted.length === 0) return null;

    return (
        <section className="section pt-0">
            <div className="container-page">
                <SectionHeader
                    eyebrow="Limited time"
                    title="Flash sale"
                    description="Discounts that will not wait for payday."
                    href="/flash-sale"
                    linkLabel="See all deals"
                />

                <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                    {discounted.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;