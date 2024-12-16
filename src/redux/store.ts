import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cart/cartSlice";
import compareReducer from "./features/compare/compareSlice";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const cartPersistConfig = {
    key: "cart",
    storage,
    whitelist: ["cart"],
};

const comparePersistConfig = {
    key: "compare",
    storage,
    whitelist: ["compare"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedCompareReducer = persistReducer(comparePersistConfig, compareReducer);

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        compare: persistedCompareReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            baseApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
