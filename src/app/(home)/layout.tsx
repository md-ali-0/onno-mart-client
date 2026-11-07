import BackToTop from "@/components/shared/back-to-top";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main id="main-content">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-primary-foreground"
            >
                Skip to content
            </a>
            <Navbar />
            {children}
            <BackToTop />
            <Footer />
        </main>
    );
}
