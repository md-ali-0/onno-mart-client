import { addProduct } from "@/redux/features/compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeftRight, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { AddToCartTopSelling } from "../shared/add-to-cart-top";
import StarRating from "./star-rating";

const MAX_RECENT_PRODUCTS = 10;

const addToRecentProducts = (product: Product) => {
    const recentProductsKey = "recentProducts";
    let recentProducts: Product[] = JSON.parse(
        localStorage.getItem(recentProductsKey) || "[]"
    );

    recentProducts = recentProducts.filter((p) => p.id !== product.id);
    recentProducts.unshift(product);
    if (recentProducts.length > MAX_RECENT_PRODUCTS) {
        recentProducts.pop();
    }

    localStorage.setItem(recentProductsKey, JSON.stringify(recentProducts));
};

export default function ProductCardBestTop({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const compare = useAppSelector((state) => state.compare.compare);
    const handleProductClick = () => {
        addToRecentProducts(product);
    };

    const addToCompare = () => {
        if (
            compare.length > 0 &&
            compare[0].categoryId !== product.categoryId
        ) {
            return toast.warning("You can compare Only Same Category Products");
        } else {
            dispatch(addProduct(product));
        }
    };

    return (
        <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <div className="bg-white border rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                            <Link
                                href={`/product/${product?.slug}`}
                                onClick={handleProductClick}
                            >
                                <Eye className="w-5 h-5" />
                            </Link>
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                            <ArrowLeftRight
                                className="w-5 h-5"
                                onClick={addToCompare}
                            />
                        </button>
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <Link
                    href={`/product/${product?.slug}`}
                    onClick={handleProductClick}
                    className="font-semibold text-lg mb-2 line-clamp-2"
                >
                    {product.name}
                </Link>
                <StarRating rating={product?.rating} />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>
                    <AddToCartTopSelling product={product} quantity={1} />
                </div>
            </div>
        </motion.div>
    );
}
