import { SessionProvider } from "@/provider/session-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "../styles/globals.css";

const ReduxProvider = dynamic(() => import("@/provider/redux-provider"), {
    ssr: false,
});

export const metadata: Metadata = {
    title: "Onno Mart - Ecommerce Website",
    description: "Generated by create next app",
};

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${roboto.className} antialiased`}
                suppressHydrationWarning
            >
                <SessionProvider>
                    <ReduxProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                            <Toaster richColors expand />
                        </ThemeProvider>
                    </ReduxProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
