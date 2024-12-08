"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import CartProduct from "./cart-product";
import OrderSummary from "./order-summery";

interface CartDetailsProps {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartDetails: React.FC<CartDetailsProps> = ({ cartProducts, setCartProducts }) => {
    const handleClearCart = () => {
        localStorage.removeItem("cartProducts");
        setCartProducts([]);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="bg-white dark:bg-gray-900 border rounded-lg md:col-span-9 p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Images
                                </th>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Product
                                </th>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Unit Price
                                </th>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Quantity
                                </th>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Total
                                </th>
                                <th className="py-2 px-4 whitespace-nowrap border-b">
                                    Remove
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts?.map((product) => (
                                <CartProduct key={product.id} product={product} setCartProducts={setCartProducts} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col md:flex-row justify-between mt-5">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Input type="text" placeholder="Coupon code" />
                        <Button className="px-4 py-2 ml-2 w-full md:w-auto">
                            Apply coupon
                        </Button>
                    </div>
                    <Button
                        className="px-4 py-2 w-full md:w-auto"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </Button>
                </div>
            </div>
            <div className="md:col-span-3">
                <OrderSummary />
            </div>
        </div>
    );
};

export default CartDetails;