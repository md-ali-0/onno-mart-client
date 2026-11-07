"use client";

import { discountedPrice, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    decrementQuantity,
    incrementQuantity,
    removeProduct,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Check, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type CartDrawerProps = {
    open: boolean;
    onClose: () => void;
};

/** Matches the "free delivery over ৳2,000" promise in the top bar. */
const FREE_DELIVERY_AT = 2000;

/**
 * Slide-over cart. Keeps the shopper on the page instead of bouncing them to
 * /cart, which is where the header cart icon used to send everyone.
 */
export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();

    const subtotal = cart.reduce(
        (sum, item) => sum + discountedPrice(item) * item.quantity,
        0
    );
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const remaining = Math.max(0, FREE_DELIVERY_AT - subtotal);
    const progress = Math.min(100, (subtotal / FREE_DELIVERY_AT) * 100);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    return (
        <div
            className={cn(
                "fixed inset-0 z-[70]",
                open ? "pointer-events-auto" : "pointer-events-none"
            )}
            aria-hidden={!open}
        >
            <button
                type="button"
                tabIndex={open ? 0 : -1}
                aria-label="Close cart"
                onClick={onClose}
                className={cn(
                    "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
                    open ? "opacity-100" : "opacity-0"
                )}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                className={cn(
                    "absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-card shadow-lift transition-transform duration-300 ease-out",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                <header className="flex h-14 shrink-0 items-center justify-between border-b px-5">
                    <h2 className="flex items-center gap-2 text-[15px] font-semibold">
                        <ShoppingBag className="h-4 w-4 text-primary" aria-hidden />
                        Your cart
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[12px] font-semibold text-primary">
                            {itemCount}
                        </span>
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close cart"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </header>

                {cart.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                            <ShoppingBag className="h-6 w-6" aria-hidden />
                        </span>
                        <p className="text-[16px] font-semibold">
                            Your cart is empty
                        </p>
                        <p className="text-[13px] leading-relaxed text-muted-foreground">
                            Browse the shops and add something you like.
                        </p>
                        <Link
                            href="/products"
                            onClick={onClose}
                            className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Delivery nudge: the most useful line in a cart. */}
                        <div className="shrink-0 border-b bg-secondary/60 px-5 py-3">
                            {remaining > 0 ? (
                                <>
                                    <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                                        <Truck className="h-3.5 w-3.5" aria-hidden />
                                        Add{" "}
                                        <span className="font-semibold text-foreground">
                                            {formatPrice(remaining)}
                                        </span>{" "}
                                        more for free delivery
                                    </p>
                                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                                        <div
                                            className="h-full rounded-full bg-primary transition-all duration-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <p className="flex items-center gap-1.5 text-[12px] font-medium text-[#1F7A20]">
                                    <Check className="h-3.5 w-3.5" aria-hidden />
                                    Free delivery unlocked
                                </p>
                            )}
                        </div>

                        <ul className="flex-1 divide-y overflow-y-auto px-5">
                            {cart.map((item) => (
                                <li key={item.id} className="group flex gap-3 py-4">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        onClick={onClose}
                                        className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg border bg-secondary"
                                    >
                                        <Image
                                            src={item.thumbnail}
                                            alt=""
                                            fill
                                            sizes="76px"
                                            className="object-cover"
                                        />
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-2">
                                            <Link
                                                href={`/product/${item.slug}`}
                                                onClick={onClose}
                                                className="line-clamp-2 text-[13.5px] font-medium leading-snug transition-colors hover:text-primary"
                                            >
                                                {item.name}
                                            </Link>
                                            <button
                                                type="button"
                                                aria-label={`Remove ${item.name}`}
                                                onClick={() =>
                                                    dispatch(
                                                        removeProduct({
                                                            id: item.id,
                                                        })
                                                    )
                                                }
                                                className="shrink-0 rounded p-0.5 text-muted-foreground/60 transition-colors hover:text-sale"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
                                            {item.shop?.name}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                                            <div className="flex h-7 items-center rounded-full border">
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                    onClick={() =>
                                                        dispatch(
                                                            decrementQuantity({
                                                                id: item.id,
                                                            })
                                                        )
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-6 text-center text-[13px] font-semibold tabular-nums">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    onClick={() =>
                                                        dispatch(
                                                            incrementQuantity({
                                                                id: item.id,
                                                            })
                                                        )
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <span className="text-[14px] font-bold tabular-nums">
                                                {formatPrice(
                                                    discountedPrice(item) *
                                                        item.quantity
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <footer className="shrink-0 border-t bg-card px-5 pb-5 pt-4">
                            <div className="flex items-baseline justify-between">
                                <span className="text-[13px] text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="text-[20px] font-bold tabular-nums">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                            <p className="mt-0.5 text-[12px] text-muted-foreground">
                                Delivery and VAT calculated at checkout.
                            </p>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="mt-4 flex h-12 items-center justify-center rounded-lg bg-primary text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Checkout
                            </Link>
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="mt-2 flex h-11 items-center justify-center rounded-lg border text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                View full cart
                            </Link>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    );
}
