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
import { addProduct, clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function AddToCartTopSelling({
    product,
    quantity = 1,
}: {
    product: Product;
    quantity: number;
}) {
    const [showDialog, setShowDialog] = useState(false);
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();

    const addToCart = () => {
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            dispatch(addProduct({ ...product, quantity }));
        } else {
            if (cart.length > 0 && cart[0].shopId !== product.shopId) {
                setShowDialog(true);
                return;
            }
            dispatch(addProduct({ ...product, quantity }));
        }
    };

    const replaceCart = () => {
        dispatch(clearCart());
        dispatch(addProduct({ ...product, quantity: 1 }));
        setShowDialog(false);
    };

    return (
        <>
            <button
                onClick={addToCart}
                className="bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition-colors duration-200"
            >
                <ShoppingCart className="w-5 h-5" />
            </button>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Replace Cart Items?</DialogTitle>
                        <DialogDescription>
                            This product is from a different shop. Adding it
                            will replace all items in your cart. Do you want to
                            proceed?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={replaceCart}>Replace Cart</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
