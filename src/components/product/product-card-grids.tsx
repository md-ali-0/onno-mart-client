import { Product } from "@/types";
import ProductCard from "./product-card";

export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
