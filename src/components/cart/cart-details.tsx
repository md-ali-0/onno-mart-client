"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useGetSingleCouponMutation } from "@/redux/features/coupon/couponApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import CartProduct from "./cart-product";
import OrderSummary from "./order-summery";

const CartDetails: React.FC = () => {
    const cart = useAppSelector((state) => state.cart.cart);
    const [discount, setDiscount] = useState(0);
    const dispatch = useAppDispatch();
    const [checkCoupon, { isLoading, isError, error, isSuccess, data }] = useGetSingleCouponMutation();

    const handleClearCart = () => {
        dispatch(clearCart());
    };
    
    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;
            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        }

        if (isSuccess && data) {
            if (data?.data?.isActive && new Date(data?.data?.endDate) >= new Date()) {
                setDiscount(data?.data?.discount);
                toast.success("Coupon Applied Successfully");
            } else {
                toast.error("Coupon has expired or is no longer active");
            }
        }
    }, [isError, isSuccess, error, data]);

    const handleDiscount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const couponCode = formData.get("cupon") as string;

        if (!couponCode) {
            toast.error("Please enter a coupon code");
            return;
        }

        await checkCoupon({ code: couponCode });
    };

    return (
        <>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="bg-white dark:bg-gray-900 border rounded-lg md:col-span-9 p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Images
                                        </th>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Product
                                        </th>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Unit Price
                                        </th>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Quantity
                                        </th>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Total
                                        </th>
                                        <th className="py-2 px-4 whitespace-nowrap border-b">
                                            Remove
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.map((product) => (
                                        <CartProduct
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between mt-5">
                            <form onSubmit={handleDiscount} className="flex items-center mb-4 md:mb-0">
                                <Input type="text" placeholder="Coupon code" name="cupon" />
                                <Button type="submit" className="px-4 py-2 ml-2 w-full md:w-auto">
                                    {isLoading ? "Validating..." : "Apply coupon"}
                                </Button>
                            </form>
                            <Button
                                className="px-4 py-2 w-full md:w-auto"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <OrderSummary discount={discount} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 border rounded-lg py-20 gap-5">
                    <h3 className="text-xl">Your shopping cart is empty.</h3>
                    <Button asChild>
                        <Link href={"/products"}>
                            <ShoppingBag size={20} className="mr-2" /> View Our
                            Products
                        </Link>
                    </Button>
                </div>
            )}
        </>
    );
};

export default CartDetails;
