import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface CompareState {
    compare: Product[];
}

const MAX_COMPARE_ITEMS = 3;

const initialState: CompareState = {
    compare: [],
};

export const compareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingProduct = state.compare.find(
                (p) => p.id === product.id
            );

            if (existingProduct) {
                toast.success("Already Added to Compare");
            } else {
                if (state.compare.length >= MAX_COMPARE_ITEMS) {
                    state.compare.shift(); // Remove the oldest product
                }
                state.compare.push(product);
                toast.success("Product added to Compare");
            }
        },
        removeProduct: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;

            state.compare = state.compare.filter(
                (product) => product.id !== id
            );
            toast.success("Product removed from Compare");
        },
        clearCompare: (state) => {
            state.compare = [];
            toast.success("Compare cleared");
        },
    },
});

export const { addProduct, removeProduct, clearCompare } = compareSlice.actions;

export default compareSlice.reducer;
