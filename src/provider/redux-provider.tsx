"use client";

import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

persistStore(store);

const ReduxProvider = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
