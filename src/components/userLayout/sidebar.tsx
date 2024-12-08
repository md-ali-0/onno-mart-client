'use client'

import {
    Box,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    ShoppingBag,
    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/user/dashboard" },
    { icon: Users, label: "Vendor Panel", href: "/dashboard" },
    { icon: ShoppingBag, label: "Purchased Items", href: "/user/purchased-items" },
    { icon: FileText, label: "Transactions", href: "/user/transactions" },
    { icon: Box, label: "Favorite Sellers", href: "/user/favorite-seller" },
    { icon: Settings, label: "Edit Profile", href: "/user/edit-profile" },
    { icon: Settings, label: "Reset Password", href: "/user/reset-password" },
    { icon: LogOut, label: "Logout" },
];

export default function Sidebar() {
    const path = usePathname()

    return (
        <aside className="w-64 bg-white border rounded-xl p-4 hidden md:block h-fit">
            <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href || '#'}
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
            </nav>
        </aside>
    );
}
