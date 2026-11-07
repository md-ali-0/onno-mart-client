"use client";

import { formatPrice } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { useSession } from "@/provider/session-provider";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/paymentApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
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
        const toastId = toast.loading("Starting the payment...");

        try {
            const response = await createPayment({
                orderData,
                paymentMethod: data.paymentMethod,
            }).unwrap();
            toast.dismiss(toastId);

            if (response?.data) {
                dispatch(clearCart());
                window.location.href = response.data;
                return;
            }

            toast.error("The payment gateway did not return a checkout link.");
        } catch (error) {
            toast.dismiss(toastId);
            // Surface the API message: a deployment without gateway credentials
            // now answers 503 with a readable explanation.
            const message =
                (error as { data?: { message?: string } })?.data?.message ??
                "Could not start the payment. Please try again.";
            toast.error(message);
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
                        <div className="rounded-lg border bg-card lg:sticky lg:top-32">
                            <div className="flex items-center justify-between border-b px-5 py-4">
                                <h2 className="text-[15px] font-semibold">
                                    Order summary
                                </h2>
                                <Link
                                    href="/cart"
                                    className="text-[12px] font-medium text-primary hover:underline"
                                >
                                    Edit cart
                                </Link>
                            </div>

                            <ul className="divide-y px-5">
                                {cart.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex items-center gap-3 py-3"
                                    >
                                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border bg-secondary">
                                            <Image
                                                src={item.thumbnail}
                                                alt=""
                                                fill
                                                sizes="44px"
                                                className="object-cover"
                                            />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="line-clamp-1 block text-[13px] font-medium">
                                                {item.name}
                                            </span>
                                            <span className="text-[12px] text-muted-foreground">
                                                Qty {item.quantity}
                                            </span>
                                        </span>
                                        <span className="text-[13px] font-semibold tabular-nums">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <dl className="space-y-2 border-t px-5 py-4 text-[13px]">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Subtotal</dt>
                                    <dd className="tabular-nums">{formatPrice(total)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">VAT (15%)</dt>
                                    <dd className="tabular-nums">{formatPrice(vatAmount)}</dd>
                                </div>
                                {discountPrice > 0 && (
                                    <div className="flex justify-between text-[#1F7A20]">
                                        <dt>Coupon discount</dt>
                                        <dd className="tabular-nums">
                                            -{formatPrice(discountPrice)}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex items-baseline justify-between border-t pt-2.5">
                                    <dt className="text-[14px] font-semibold">Total</dt>
                                    <dd className="text-[20px] font-bold tabular-nums">
                                        {formatPrice(totalPriceAfterDiscount)}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
