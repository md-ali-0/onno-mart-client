import Sidebar from "@/components/userLayout/sidebar";

export default function UserDashLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="container px-5 py-5 mx-auto gap-5 flex overflow-hidden">
            <Sidebar />
            <div className="relative flex flex-col flex-1 overflow-x-hidden">
                <main>{children}</main>
            </div>
        </div>
    );
}
