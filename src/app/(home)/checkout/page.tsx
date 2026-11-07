"use client";

import { formatPrice } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { useSession } from "@/provider/session-provider";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
};

export default function CheckoutPage() {
    const { session } = useSession();
    const cart = useAppSelector((state) => state.cart.cart);
    const [discount, setDiscount] = useState(0);
    const [createPayment] = useCreatePaymentIntentMutation();
    // const [paymentMethod, setPaymentMethod] = useState("")
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    useEffect(() => {
        const discount = localStorage.getItem("discount");
        if (discount) {
            setDiscount(Number(discount));
        }
    }, []);

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const [vatAmount, setVatAmount] = useState(0);

    const VAT_RATE = 0.15; // 15%

    useEffect(() => {
        setVatAmount(total * VAT_RATE);
    }, [total]);

    const totalPriceWithVat = total + vatAmount;
    const totalPriceAfterDiscount =
        totalPriceWithVat - (totalPriceWithVat * discount) / 100;
    const discountPrice = totalPriceWithVat - totalPriceAfterDiscount;

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (cart.length <= 0) {
            return toast.error("Cart is Empty");
        }
        const orderData = {
            userId: session?.user,
            shopId: cart[0].shopId,
            products: cart,
            customer: data,
            totalAmount: totalPriceAfterDiscount.toFixed(),
        };
        const toastId = toast.success("Redrecting to Payment....");
        const response = await createPayment({orderData, paymentMethod: data.paymentMethod}).unwrap();
        toast.dismiss(toastId);

        if (response?.data) {
            dispatch(clearCart());
            window.location.href = response.data;
        }
    };

    return (
        <section className="relative md:py-24 py-16">
            <div className="container relative">
                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="lg:col-span-8">
                        <div className="p-6 rounded-md border">
                            {!session?.isAuth && (
                                <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-accent px-4 py-3 text-[13px]">
                                    <span>
                                        Checking out as a guest — no account
                                        needed.
                                    </span>
                                    <Link
                                        href="/auth/signin"
                                        className="font-semibold text-primary hover:underline"
                                    >
                                        Sign in instead
                                    </Link>
                                </div>
                            )}
                            <h3 className="text-xl leading-normal font-semibold">
                                Billing address
                            </h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                                    <div className="lg:col-span-6">
                                        <label className="form-label font-semibold">
                                            First Name :{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register("firstName", {
                                                required: true,
                                            })}
                                            type="text"
                                            className="w-full py-2 px-3 h-10 bg-transparent rounded outline-none focus:ring-0 mt-2"
                                            placeholder="First Name:"
                                        />
                                        {errors.firstName && (
                                            <span className="text-red-500">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                    <div className="lg:col-span-6">
                                        <label className="form-label font-semibold">
                                            Last Name :{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register("lastName", {
                                                required: true,
                                            })}
                                            type="text"
                                            className="w-full py-2 px-3 h-10 bg-transparent rounded outline-none focus:ring-0 mt-2"
                                            placeholder="Last Name:"
                                        />
                                        {errors.lastName && (
                                            <span className="text-red-500">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                    <div className="lg:col-span-6">
                                        <label className="form-label font-semibold">
                                            Your Email :{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register("email", {
                                                required: true,
                                                pattern: /^\S+@\S+$/i,
                                            })}
                                            type="email"
                                            className="w-full py-2 px-3 h-10 bg-transparent rounded outline-none focus:ring-0 mt-2"
                                            placeholder="Email"
                                        />
                                        {errors.email && (
                                            <span className="text-red-500">
                                                Please enter a valid email
                                            </span>
                                        )}
                                    </div>
                                    <div className="lg:col-span-6">
                                        <label className="form-label font-semibold">
                                            Your Phone :{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register("phone", {
                                                required: true,
                                            })}
                                            type="text"
                                            className="w-full py-2 px-3 h-10 bg-transparent rounded outline-none focus:ring-0 mt-2"
                                            placeholder="Phone"
                                        />
                                        {errors.phone && (
                                            <span className="text-red-500">
                                                {errors?.phone?.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="lg:col-span-12">
                                        <label className="form-label font-semibold">
                                            Address :{" "}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </label>
                                        <Input
                                            {...register("address", {
                                                required: true,
                                            })}
                                            type="text"
                                            className="w-full py-2 px-3 h-10 bg-transparent rounded outline-none focus:ring-0 mt-2"
                                            placeholder="Address:"
                                        />
                                        {errors.address && (
                                            <span className="text-red-500">
                                                This field is required
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-xl leading-normal font-semibold mt-6">
                                    Payment
                                </h3>
                                <div>
                                    <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                                        <div className="lg:col-span-12">
                                            <div className="block">
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            {...register(
                                                                "paymentMethod",
                                                                {
                                                                    required:
                                                                        true,
                                                                }
                                                            )}
                                                            type="radio"
                                                            className="form-radio border-gray-100 dark:border-gray-800 text-primary focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                            value="AmarPay"
                                                            defaultChecked
                                                        />
                                                        <span className="text-slate-400">
                                                            AmarPay
                                                        </span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            {...register(
                                                                "paymentMethod",
                                                                {
                                                                    required:
                                                                        true,
                                                                }
                                                            )}
                                                            type="radio"
                                                            className="form-radio border-gray-100 dark:border-gray-800 text-primary focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                            value="SSLCommerz"
                                                            
                                                        />
                                                        <span className="text-slate-400">
                                                            SSL Commerz
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Input
                                        type="submit"
                                        className="inline-block w-full cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-center text-base tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
                                        value="Continue to checkout"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="p-6 rounded-md border">
                            <div className="flex justify-between items-center">
                                <h5 className="text-lg font-semibold">
                                    Your Cart
                                </h5>
                                <Link
                                    className="bg-primary flex justify-center items-center text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full h-5"
                                    href="/cart"
                                >
                                    {cart.length}
                                </Link>
                            </div>
                            <div className="mt-4">
                                {cart.map((catItem, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 border flex justify-between items-center mb-1"
                                    >
                                        <div>
                                            <h5 className="font-semibold">
                                                {catItem.name}
                                            </h5>
                                        </div>
                                        <p className="text-slate-400 font-semibold">
                                            {formatPrice(catItem.price)}
                                        </p>
                                    </div>
                                ))}

                                <div className="p-3 flex justify-between items-center border bg-gray-50 dark:bg-slate-800 text-green-600 mb-1">
                                    <div>
                                        <h5 className="font-semibold">
                                            Discount Price
                                        </h5>
                                    </div>
                                    <p className="text-red-600 font-semibold">
                                        -{formatPrice(discountPrice)}
                                    </p>
                                </div>
                                <div className="p-3 flex justify-between items-center border mb-1">
                                    <div>
                                        <h5 className="font-semibold">
                                            Total (BDT)
                                        </h5>
                                    </div>
                                    <p className="font-semibold">
                                        {formatPrice(totalPriceAfterDiscount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
