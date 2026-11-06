"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { addProduct, clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const VARIANTS = {
    primary: "h-10 px-5 text-sm bg-primary text-primary-foreground hover:bg-foreground",
    subtle: "h-10 px-4 text-sm bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
    outline: "h-10 px-4 text-sm border border-input bg-transparent hover:bg-secondary",
    quiet: "h-9 px-4 text-[11px] uppercase tracking-[0.12em] border border-foreground/20 bg-transparent hover:border-foreground hover:bg-foreground hover:text-background",
} as const;

type AddToCartButtonProps = {
    product: Product;
    quantity?: number;
    className?: string;
    variant?: keyof typeof VARIANTS;
    disabled?: boolean;
    label?: string;
};

/**
 * One button, three visual weights. The old version hard-coded a set of
 * Tailwind classes and then appended caller classes to the same string, so
 * padding, margin and colours fought each other.
 */
export function AddToCartButton({
    product,
    quantity = 1,
    className,
    variant = "primary",
    disabled = false,
    label = "Add to cart",
}: AddToCartButtonProps) {
    const [showDialog, setShowDialog] = useState(false);
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();

    const outOfStock = (product.inventory ?? 0) <= 0;
    const isDisabled = disabled || outOfStock;

    const addToCart = () => {
        const existingItem = cart.find((item) => item.id === product.id);

        if (!existingItem && cart.length > 0 && cart[0].shopId !== product.shopId) {
            setShowDialog(true);
            return;
        }
        dispatch(addProduct({ ...product, quantity }));
    };

    const replaceCart = () => {
        dispatch(clearCart());
        dispatch(addProduct({ ...product, quantity }));
        setShowDialog(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={addToCart}
                disabled={isDisabled}
                aria-label={outOfStock ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    VARIANTS[variant],
                    className
                )}
            >
                <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                <span className="truncate">{outOfStock ? "Out of stock" : label}</span>
            </button>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Replace cart items?</DialogTitle>
                        <DialogDescription>
                            This product is from a different shop. Adding it will
                            replace everything already in your cart.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={replaceCart}>Replace cart</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
