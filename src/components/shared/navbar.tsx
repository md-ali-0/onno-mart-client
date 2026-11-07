"use client";

import { signout } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    ArrowLeftRight,
    ChevronDown,
    Heart,
    LayoutGrid,
    LogIn,
    LogOut,
    Menu,
    Phone,
    ShoppingBag,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartDrawer from "../cart/cart-drawer";
import NavbarCategorySearch from "./navbar-category-search";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/flash-sale", label: "Deals" },
    { href: "/shops", label: "Shops" },
    { href: "/compare", label: "Compare" },
    { href: "/contact", label: "Contact" },
] as const;

function isActive(path: string, href: string) {
    return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [isDropdownOpen, setIsDropDownOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const cart = useAppSelector((state) => state.cart.cart);
    const compareCount = useAppSelector((state) => state.compare.compare.length);
    const { session, setIsLoading } = useSession();
    const { data } = useGetMeQuery(undefined, {
        skip: !session?.isAuth,
    });

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        setShowMenu(false);
        setIsDropDownOpen(false);
    }, [path]);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("accessToken");
            await signout();
            setIsLoading(false);
            setIsDropDownOpen(false);
            router.replace("/auth/signin");
            toast.success("Signed out");
        } catch {
            setIsLoading(false);
            toast.error("Could not sign out. Please try again.");
        }
    };

    return (
        <>
            {isDropdownOpen && (
                <button
                    type="button"
                    aria-label="Close account menu"
                    onClick={() => setIsDropDownOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                />
            )}

            <header className="sticky top-0 z-50 bg-card shadow-sm">
                {/* Main row */}
                <div className="container-page">
                    <div className="flex h-[74px] items-center gap-4">
                        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="OnnoMart home">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <ShoppingBag className="h-[18px] w-[18px]" aria-hidden />
                            </span>
                            <span className="text-[21px] font-bold tracking-[-0.02em]">
                                Onno<span className="text-primary">Mart</span>
                            </span>
                        </Link>

                        <button
                            type="button"
                            aria-label={showMenu ? "Close menu" : "Open menu"}
                            onClick={() => setShowMenu(!showMenu)}
                            className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
                        >
                            {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>

                        <div className="hidden min-w-0 flex-1 md:block">
                            <NavbarCategorySearch />
                        </div>

                        <div className="ml-auto flex items-center gap-1 sm:gap-3">
                            <a
                                href="tel:+8801700000000"
                                className="hidden items-center gap-2 xl:flex"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                                    <Phone className="h-4 w-4" aria-hidden />
                                </span>
                                <span className="text-[12px] leading-tight">
                                    <span className="block text-muted-foreground">Hotline</span>
                                    <span className="block font-semibold">+880 1700 000000</span>
                                </span>
                            </a>

                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Account menu"
                                    aria-expanded={isDropdownOpen}
                                    onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-secondary"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                                        <User className="h-4 w-4" aria-hidden />
                                    </span>
                                    <span className="hidden text-[12px] leading-tight lg:block">
                                        <span className="block text-muted-foreground">
                                            {session?.isAuth ? "Signed in" : "Log in / Sign up"}
                                        </span>
                                        <span className="block font-semibold">
                                            {session?.isAuth
                                                ? (data?.name?.split(" ")[0] ?? "Account")
                                                : "Access account"}
                                        </span>
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border bg-card py-1.5 shadow-lift">
                                        {session?.isAuth ? (
                                            <>
                                                <Link
                                                    href={session.role === "ADMIN" || session.role === "VENDOR" ? "/dashboard" : "/user/dashboard"}
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-[14px] hover:bg-secondary"
                                                >
                                                    <LayoutGrid className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    {session.role === "ADMIN" || session.role === "VENDOR"
                                                        ? "Dashboard"
                                                        : "My account"}
                                                </Link>
                                                <Link
                                                    href="/user/purchased-items"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-[14px] hover:bg-secondary"
                                                >
                                                    <ShoppingBag className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Orders
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-2 border-t px-4 py-2 text-[14px] text-sale hover:bg-secondary"
                                                >
                                                    <LogOut className="h-4 w-4" aria-hidden />
                                                    Sign out
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/auth/signin"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-[14px] hover:bg-secondary"
                                                >
                                                    <LogIn className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Sign in
                                                </Link>
                                                <Link
                                                    href="/auth/signup"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2 text-[14px] hover:bg-secondary"
                                                >
                                                    <User className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Create an account
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/compare"
                                className="relative hidden h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary sm:flex"
                                aria-label="Compare products"
                            >
                                <ArrowLeftRight className="h-4 w-4" aria-hidden />
                                {compareCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale px-1 text-[11px] font-bold text-sale-foreground">
                                        {compareCount}
                                    </span>
                                )}
                            </Link>

                            <button
                                type="button"
                                onClick={() => setCartOpen(true)}
                                aria-label={`Cart, ${cartCount} items`}
                                className="relative flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-secondary"
                            >
                                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                                    <ShoppingCart className="h-4 w-4" aria-hidden />
                                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale px-1 text-[11px] font-bold text-sale-foreground">
                                        {cartCount}
                                    </span>
                                </span>
                                <span className="hidden text-[12px] leading-tight lg:block">
                                    <span className="block text-muted-foreground">Total cart</span>
                                    <span className="block font-semibold">
                                        {cartCount} item{cartCount === 1 ? "" : "s"}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Blue navigation bar */}
                <div className="bg-primary text-primary-foreground">
                    <div className="container-page flex h-11 items-center justify-between">
                        <nav aria-label="Main navigation" className="hidden lg:block">
                            <ul className="flex items-center gap-6">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            aria-current={isActive(path, link.href) ? "page" : undefined}
                                            className={cn(
                                                "flex items-center gap-1 text-[15px] font-medium transition-opacity hover:opacity-80",
                                                isActive(path, link.href) && "font-semibold"
                                            )}
                                        >
                                            {link.label}
                                            {link.href === "/products" && (
                                                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-5 text-[14px]">
                            <Link href="/flash-sale" className="flex items-center gap-1.5 hover:opacity-80">
                                <Heart className="h-3.5 w-3.5" aria-hidden />
                                Special offers
                            </Link>
                            <Link href="/user/recent-view-products" className="hidden items-center gap-1.5 hover:opacity-80 sm:flex">
                                Recent viewed
                            </Link>
                        </div>
                    </div>
                </div>

                {showMenu && (
                    <div className="border-t bg-card lg:hidden">
                        <div className="container-page py-4">
                            <div className="mb-4">
                                <NavbarCategorySearch />
                            </div>
                            <nav aria-label="Mobile navigation">
                                <ul className="grid grid-cols-2 gap-1">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                onClick={() => setShowMenu(false)}
                                                className={cn(
                                                    "block rounded-lg px-3 py-2.5 text-[14px] font-medium",
                                                    isActive(path, link.href)
                                                        ? "bg-accent text-primary"
                                                        : "text-foreground hover:bg-secondary"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
