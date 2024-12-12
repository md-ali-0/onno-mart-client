import { decrementQuantity, incrementQuantity, removeProduct } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CartItem } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface CartProductProps {
    product: CartItem;
}

const CartProduct: FC<CartProductProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(product.quantity);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setQuantity(product.quantity);
    }, [product.quantity, product.inventory]);

    const deleteCartProduct = () => {
        dispatch(removeProduct({ id: product.id }));
    };

    const handleIncrementQuantity = () => {
        if (quantity < product.inventory) {
            dispatch(
                incrementQuantity({ id: product.id })
            );
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            dispatch(
                decrementQuantity({ id: product.id })
            );
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

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
                        onClick={handleDecrementQuantity}
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
                        onClick={handleIncrementQuantity}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="py-2 px-4 border-b">
                ${Number(product.quantity * product.price).toFixed(2)}
            </td>
            <td className="text-center py-2 px-4 border-b">
                <button onClick={deleteCartProduct}>
                    <X size={15} />
                </button>
            </td>
        </tr>
    );
};

export default CartProduct;
