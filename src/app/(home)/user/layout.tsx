import Sidebar from "@/components/userLayout/sidebar";

export default function UserDashLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container mx-auto my-10">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                {/* Main Content */}
                <main className="flex-1 px-4">
                    {/* Metrics */}
                    {children}
                </main>
            </div>
        </div>
    );
}
