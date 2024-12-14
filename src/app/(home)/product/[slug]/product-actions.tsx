"use client";

import { AddToCartButton } from "@/components/shared/add-to-cart";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductActionsProps {
    product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    return (
        <>
            <div className="space-y-3.5 mt-4">
                <div className="flex items-center gap-2">
                    <h5 className="text-lg font-semibold me-2">Brand:</h5>
                    <h4>{product.brand.name}</h4>
                </div>
                <div className="flex items-center">
                    <h5 className="text-lg font-semibold me-2">Seller:</h5>
                    <Link
                        href={`/shop/${product?.shop.id}`}
                        className="flex items-center gap-2"
                    >
                        <Image
                            src={product?.shop?.logoUrl as unknown as string}
                            width={50}
                            height={50}
                            className="size-8 rounded-full"
                            alt={product.shop.name}
                        />
                        <h3>{product.shop.name}</h3>
                    </Link>
                </div>
                <div className="flex items-center">
                    <h5 className="text-lg font-semibold me-2">Quantity:</h5>
                    <div className="qty-icons ms-3 space-x-0.5">
                        <button onClick={()=>setQuantity(quantity-1)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">
                            -
                        </button>
                        <input
                            min={0}
                            max={product.inventory}
                            value={quantity}
                            name="quantity"
                            type="number"
                            readOnly
                            className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity"
                            defaultValue={0}
                        />
                        <button onClick={()=>setQuantity(quantity+1)} className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 space-x-1">
                <AddToCartButton product={product} quantity={quantity} clx="bg-orange-500/20 hover:bg-orange-500 text-orange-500 hover:text-white mt-2"/>
            </div>
        </>
    );
}
