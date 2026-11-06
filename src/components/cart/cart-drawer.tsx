"use client";

import { discountedPrice, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
    decrementQuantity,
    incrementQuantity,
    removeProduct,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type CartDrawerProps = {
    open: boolean;
    onClose: () => void;
};

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
                <header className="flex items-center justify-between border-b px-5 py-4">
                    <h2 className="flex items-center gap-2 text-[15px] font-bold">
                        <ShoppingBag className="h-4 w-4 text-primary" aria-hidden />
                        Your cart
                        <span className="text-muted-foreground">
                            ({itemCount})
                        </span>
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close cart"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </header>

                {cart.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                            <ShoppingBag className="h-6 w-6" aria-hidden />
                        </span>
                        <p className="text-[15px] font-semibold">
                            Your cart is empty
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                            Browse the shops and add something you like.
                        </p>
                        <Link
                            href="/products"
                            onClick={onClose}
                            className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y overflow-y-auto px-5">
                            {cart.map((item) => (
                                <li key={item.id} className="flex gap-3 py-4">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        onClick={onClose}
                                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                                    >
                                        <Image
                                            src={item.thumbnail}
                                            alt=""
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <Link
                                            href={`/product/${item.slug}`}
                                            onClick={onClose}
                                            className="line-clamp-2 text-[13px] font-semibold leading-snug hover:text-primary"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                                            {item.shop?.name}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                                            <div className="flex items-center rounded-lg border">
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
                                                    className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-6 text-center text-[12px] font-semibold tabular-nums">
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
                                                    className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-[13px] font-bold tabular-nums">
                                                    {formatPrice(
                                                        discountedPrice(item) *
                                                            item.quantity
                                                    )}
                                                </span>
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
                                                    className="text-muted-foreground transition-colors hover:text-destructive"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <footer className="border-t px-5 py-4">
                            <div className="flex items-baseline justify-between">
                                <span className="text-[13px] text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="text-[18px] font-bold tabular-nums">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                                Delivery calculated at checkout.
                            </p>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="mt-4 flex h-11 items-center justify-center rounded-lg bg-primary text-[13px] font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Checkout
                            </Link>
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="mt-2 flex h-10 items-center justify-center rounded-lg border text-[13px] font-semibold transition-colors hover:bg-secondary"
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
