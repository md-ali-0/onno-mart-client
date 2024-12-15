import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CartState {
    cart: CartItem[];
}

const initialState: CartState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartItem>) => {
            const product = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === action?.payload?.id
            );

            if (existingProduct) {
                const updatedQuantity =
                    existingProduct.quantity + product?.quantity;
                if (updatedQuantity <= product?.inventory) {
                    existingProduct.quantity = updatedQuantity;
                    toast.success("Product added to cart");
                } else {
                    toast.error("Not enough stock available");
                }
            } else {
                if (product?.quantity <= product?.inventory) {
                    state.cart.push(product);
                    toast.success("Product added to cart");
                } else {
                    toast.error("Not enough stock available");
                }
            }
        },
        removeProduct: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            state.cart = state.cart.filter((product) => product?.id !== id);
            toast.success("Product removed from cart");
        },
        incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === id
            );
            if (existingProduct) {
                if (existingProduct.quantity < existingProduct.inventory) {
                    existingProduct.quantity += 1;
                } else {
                    toast.error("Cannot exceed stock limit");
                }
            }
        },
        decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id === id
            );
            if (existingProduct && existingProduct.quantity > 1) {
                existingProduct.quantity -= 1;
            } else if (existingProduct) {
                state.cart = state.cart.filter((product) => product.id !== id);
                toast.success("Product removed from cart");
            }
        },
        clearCart: (state) => {
            state.cart = [];
            toast.success("Cart cleared");
        },
    },
});

export const {
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
