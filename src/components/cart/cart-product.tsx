import { CartItem } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface CartProductProps {
    product: CartItem;
    updateQuantity: (id: string, newQuantity: number) => void
}

const CartProduct: FC<CartProductProps> = ({ product, updateQuantity }) => {

    return (
        <tr>
            <td className="py-2 px-4 border-b">
                <Image
                    className="size-16"
                    width={400}
                    height={400}
                    src={product.thumbnail}
                    alt={product.name}
                />
            </td>
            <td className="py-2 px-4 border-b">{product.name}</td>
            <td className="py-2 px-4 border-b">${Number(product.price).toFixed(2)}</td>
            <td className="py-2 px-4 border-b">
                <div className="flex items-center">
                    <button
                        className="flex justify-center items-center text-lg px-2 py-1 border size-8"
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="w-12 text-center mx-2 border rounded"
                        value={product.quantity}
                        readOnly
                    />
                    <button
                        className="flex justify-center items-center text-lg px-2 py-1 border size-8"
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="py-2 px-4 border-b">
                ${Number(product.quantity * product.price).toFixed(2)}
            </td>
            <td className="text-center py-2 px-4 border-b">
                <button >
                    <X size={15} />
                </button>
            </td>
        </tr>
    );
};

export default CartProduct;
