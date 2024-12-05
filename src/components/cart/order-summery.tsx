"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

const OrderSummary: FC = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [totalPriceWithOutVat, setTotalPriceWithOutVat] = useState(0);
    const [vatAmount, setVatAmount] = useState(0);

    const VAT_RATE = 0.15; // 15%

    useEffect(() => {
        // Load cart from local storage
        const cartFromStorage = JSON.parse(localStorage.getItem("cartProducts") || "[]");
        setCart(cartFromStorage);

        // Calculate totals
        const totalPrice = cartFromStorage.reduce(
            (acc: number, item: Product) => acc + item.price * item.inventory,
            0
        );
        setTotalPriceWithOutVat(totalPrice);
        setVatAmount(totalPrice * VAT_RATE);
    }, []);

    const totalPriceWithVat = totalPriceWithOutVat + vatAmount;

    const allProductsInStock = cart.every((item) => item.inventory <= item.inventory);
    const router = useRouter();

    const handleProceedToCheckout = () => {
        toast.success("Proceeding to checkout...", { duration: 500 });
        setTimeout(() => router.push("/checkout"), 500);
    };

    return (
        <div className="bg-white dark:bg-gray-900 space-y-4 rounded-lg border p-4 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                Order summary
            </p>
            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            Total before VAT
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-gray-200">
                            ${totalPriceWithOutVat.toFixed(2)}
                        </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500">
                            VAT (15%)
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-gray-200">
                            ${vatAmount.toFixed(2)}
                        </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-bold text-gray-900 dark:text-gray-200">
                            Total including VAT
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-gray-200">
                            ${totalPriceWithVat.toFixed(2)}
                        </dd>
                    </dl>
                </div>
                <dl className="flex items-center justify-between gap-4 border-t pt-2">
                    <dt className="text-base font-bold text-gray-900 dark:text-gray-200">
                        Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-gray-200">
                        ${totalPriceWithVat.toFixed(2)}
                    </dd>
                </dl>
            </div>
            <Button
                disabled={!allProductsInStock}
                className="w-full"
                onClick={handleProceedToCheckout}
            >
                Proceed to Checkout
            </Button>
            {!allProductsInStock && (
                <p className="text-sm text-red-600">
                    Some products are out of stock. Proceed to checkout
                    disabled.
                </p>
            )}
            <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <Link
                    href="/products"
                    title="Continue shopping"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                    Continue Shopping
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default OrderSummary;
