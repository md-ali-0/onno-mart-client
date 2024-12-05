import config from "@/config";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface CartProductProps {
    product: Product;
    setCartProducts: (products: Product[]) => void; // Function to update cart in parent
}

const CartProduct: FC<CartProductProps> = ({ product, setCartProducts }) => {
    const [quantity, setQuantity] = useState(product.inventory);

    useEffect(() => {
        setQuantity(product.inventory);
    }, [product.inventory]);

    const updateCartInLocalStorage = (updatedCart: Product[]) => {
        localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
        setCartProducts(updatedCart);
    };

    const deleteCartProduct = () => {
        const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
        const updatedCart = cart.filter((item: Product) => item.id !== product.id);
        updateCartInLocalStorage(updatedCart);
    };

    const handleIncrementQuantity = () => {
        if (quantity < product.inventory) {
            const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            const updatedCart = cart.map((item: Product) => {
                if (item.id === product.id) {
                    item.inventory = quantity + 1;
                }
                return item;
            });
            setQuantity(quantity + 1);
            updateCartInLocalStorage(updatedCart);
        }
    };

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            const updatedCart = cart.map((item: Product) => {
                if (item.id === product.id) {
                    item.inventory = quantity - 1;
                }
                return item;
            });
            setQuantity(quantity - 1);
            updateCartInLocalStorage(updatedCart);
        }
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= product.inventory) {
            const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
            const updatedCart = cart.map((item: Product) => {
                if (item.id === product.id) {
                    item.inventory = newQuantity;
                }
                return item;
            });
            setQuantity(newQuantity);
            updateCartInLocalStorage(updatedCart);
        }
    };

    return (
        <tr>
            <td className="py-2 px-4 border-b">
                <Image
                    className="size-16"
                    width={400}
                    height={400}
                    src={`${config.host}/${product.thumbnail}`}
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
                        value={quantity}
                        onChange={handleQuantityChange}
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
                ${Number(quantity * product.price).toFixed(2)}
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
