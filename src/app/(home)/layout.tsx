import BackToTop from "@/components/shared/back-to-top";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Navbar />
            {children}
            <BackToTop />
            <Footer />
        </main>
    );
}
