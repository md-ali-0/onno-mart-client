import { getSaleProducts } from "@/lib/get-products";
import { Product } from "@/types";
import Link from "next/link";
import FlashSaleProductCard from "../product/fash-sale-product";

const FlashSale = async () => {
    const products = await getSaleProducts()

    return (
        <section className="mb-10 sm:mb-20">
            <div className="container px-4 lg:px-0">
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-7">
                    <h2 className="text-2xl font-bold capitalize">
                        Flash Sale
                    </h2>
                    <Link
                        href="/flash-sale"
                        className="py-2 px-4 text-sm sm:py-3 sm:px-6 rounded-3xl capitalize sm:text-base font-semibold whitespace-nowrap bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        Show More
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products?.filter(product => product.discount > 0).map((product: Product) => (
                        <FlashSaleProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
