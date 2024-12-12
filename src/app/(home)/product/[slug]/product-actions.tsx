"use client";

import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Product } from "@/types";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch()

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex items-center rounded-md border">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2"
                        aria-label="Increase quantity"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <Button className="flex-1" onClick={()=>dispatch(addProduct({...product, quantity: quantity}))}>ADD TO CART</Button>
                <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
