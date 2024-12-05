"use client";

import CartDetails from "@/components/cart/cart-details";
import Breadcumb from "@/components/shared/breadcumb";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartProducts");
        setCartProducts(storedCart ? JSON.parse(storedCart) : []);
    }, []);

    return (
        <>
            <Breadcumb />
            <section className="container mx-auto px-5 sm:px-8 py-5">
                {cartProducts.length > 0 ? (
                    <CartDetails
                        cartProducts={cartProducts}
                        setCartProducts={setCartProducts}
                    />
                ) : (
                    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 border rounded-lg py-20 gap-5">
                        <h3 className="text-xl">Your shopping cart is empty.</h3>
                        <Button asChild>
                            <Link href={"/shop"}>
                                <ShoppingBag size={20} className="mr-2" /> View Our Products
                            </Link>
                        </Button>
                    </div>
                )}
            </section>
        </>
    );
}
