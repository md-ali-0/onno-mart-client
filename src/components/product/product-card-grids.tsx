import { Product } from "@/types";
import ProductCard from "./product-card";

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
