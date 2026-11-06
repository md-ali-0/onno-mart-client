"use client";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

// Rehydrate persisted slices in the browser only. On the server the store is
// created against a no-op storage, which is what lets this provider render
// during SSR instead of forcing the whole tree into client-side rendering.
if (typeof window !== "undefined") {
    persistStore(store);
}

const ReduxProvider = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
