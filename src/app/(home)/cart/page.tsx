"use client";

import CartDetails from "@/components/cart/cart-details";
import Breadcumb from "@/components/shared/breadcumb";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const updateQuantity = (id: string, newQuantity: number) => {
        const updatedCart = cart
            .map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
            .filter((item) => item.quantity > 0);

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <Breadcumb />
            <section className="container mx-auto px-5 sm:px-8 py-5">
                {cart.length > 0 ? (
                    <CartDetails
                        cart={cart}
                        updateQuantity={updateQuantity}
                        total={total}
                    />
                ) : (
                    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 border rounded-lg py-20 gap-5">
                        <h3 className="text-xl">
                            Your shopping cart is empty.
                        </h3>
                        <Button asChild>
                            <Link href={"/products"}>
                                <ShoppingBag size={20} className="mr-2" /> View
                                Our Products
                            </Link>
                        </Button>
                    </div>
                )}
            </section>
        </>
    );
}
