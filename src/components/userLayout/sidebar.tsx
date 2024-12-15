"use client";

import { signout } from "@/actions/auth";
import { useSession } from "@/provider/session-provider";
import {
    Box,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/user/dashboard" },
    {
        icon: ShoppingCart,
        label: "Recent Products",
        href: "/user/recent-view-products",
    },
    {
        icon: ShoppingBag,
        label: "Purchased Items",
        href: "/user/purchased-items",
    },
    { icon: Star, label: "My Reviews", href: "/user/my-reviews" },
    { icon: FileText, label: "Transactions", href: "/user/transactions" },
    { icon: Box, label: "Favorite Sellers", href: "/user/favorite-seller" },
    { icon: Settings, label: "Edit Profile", href: "/user/edit-profile" },
];

export default function Sidebar() {
    const path = usePathname();

    const { setIsLoading } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("accessToken");
            await signout();
            setIsLoading(false);
            router.replace("/auth/signin");
            toast.success("Logout Successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <aside className="w-64 bg-white border rounded-xl p-4 hidden md:block h-fit">
            <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href || "#"}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-lg ${
                            path === link.href
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                    </Link>
                ))}
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-gray-100 w-full" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" /> LogOut
                </button>
            </nav>
        </aside>
    );
}
