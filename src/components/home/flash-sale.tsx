import { getProducts } from "@/lib/get-products";
import { Product } from "@/types";
import FlashSaleProductCard from "../product/fash-sale-product";

const FlashSale = async () => {
    const products = await getProducts(1, 4)

    return (
        <section className="mb-10 sm:mb-20">
            <div className="container px-4 lg:px-0">
                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-7">
                    <h2 className="text-2xl font-bold capitalize">
                        Flash Sale
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products?.products.map((product: Product) => (
                        <FlashSaleProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
