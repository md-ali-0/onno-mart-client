"use client";

import { signout } from "@/actions/auth";
import logo from "@/assets/images/logo.png";
import { cn } from "@/lib/utils";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    ArrowLeftRight,
    FileText,
    LayoutGrid,
    LogIn,
    LogOut,
    Menu,
    Search,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Star,
    User,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import NavCategory from "./nav-category";
import NavbarCategorySearch from "./navbar-category-search";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/flash-sale", label: "Flash sale" },
    { href: "/shops", label: "Shops" },
    { href: "/compare", label: "Compare" },
    { href: "/contact", label: "Contact" },
] as const;

const USER_LINKS = [
    { href: "/user/dashboard", label: "My account", icon: User },
    { href: "/user/purchased-items", label: "Purchased items", icon: ShoppingBag },
    { href: "/user/my-reviews", label: "My reviews", icon: Star },
    { href: "/user/transactions", label: "Transactions", icon: FileText },
    { href: "/user/edit-profile", label: "Edit profile", icon: Settings },
] as const;

function isActive(path: string, href: string) {
    return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

function CountBadge({ count }: { count: number }) {
    if (count <= 0) return null;
    return (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground">
            {count > 9 ? "9+" : count}
        </span>
    );
}

function IconLink({
    href,
    label,
    count,
    className,
    children,
}: {
    href: string;
    label: string;
    count?: number;
    className?: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                className
            )}
        >
            {children}
            {count !== undefined && <CountBadge count={count} />}
        </Link>
    );
}

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [isDropdownOpen, setIsDropDownOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const cartCount = useAppSelector((state) => state.cart.cart.length);
    const compareCount = useAppSelector((state) => state.compare.compare.length);
    const { session, setIsLoading } = useSession();
    // Guests have no token; /api/user/me would just return a 500 on every page.
    const { data, isLoading, refetch } = useGetMeQuery(undefined, {
        skip: !session?.isAuth,
    });

    useEffect(() => {
        if (session?.isAuth && !session?.role) refetch();
    }, [session?.isAuth, session?.role, refetch]);

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
        } catch (error) {
            setIsLoading(false);
            console.error("Logout failed:", error);
            toast.error("Could not sign out. Please try again.");
        }
    };

    const accountLinks =
        session?.role === "ADMIN"
            ? [{ href: "/dashboard", label: "Dashboard", icon: LayoutGrid }]
            : session?.role === "VENDOR"
              ? [{ href: "/dashboard", label: "Vendor dashboard", icon: LayoutGrid }]
              : USER_LINKS;

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
        <header className="sticky top-0 z-50 w-full border-b bg-card">
            <div className="container-page">
                <div className="flex h-16 items-center gap-3 sm:gap-5">
                    <Link href="/" className="flex shrink-0 items-center" aria-label="OnnoMart home">
                        <Image
                            src={logo}
                            alt="OnnoMart"
                            className="h-8 w-auto sm:h-9"
                            priority
                        />
                    </Link>

                    <div className="hidden min-w-0 flex-1 md:block">
                        <NavbarCategorySearch />
                    </div>

                    <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
                        <IconLink href="/products" label="Search products" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </IconLink>
                        <IconLink href="/compare" label="Compare products" count={compareCount}>
                            <ArrowLeftRight className="h-5 w-5" />
                        </IconLink>
                        <IconLink href="/cart" label="Cart" count={cartCount}>
                            <ShoppingCart className="h-5 w-5" />
                        </IconLink>

                        {/* Account menu */}
                        <div className="relative">
                            <button
                                type="button"
                                aria-label="Account menu"
                                aria-expanded={isDropdownOpen}
                                onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {session?.isAuth ? (
                                    isLoading ? (
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    ) : (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={data?.avatar} alt={data?.name ?? "Your avatar"} />
                                            <AvatarFallback className="bg-secondary text-xs font-semibold">
                                                {data?.name?.[0]?.toUpperCase() ?? "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    )
                                ) : (
                                    <User className="h-5 w-5" />
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border bg-card py-2 shadow-lift">
                                    {session?.isAuth ? (
                                        <>
                                            <div className="border-b px-4 pb-2 pt-1">
                                                <p className="truncate text-sm font-semibold">
                                                    {data?.name ?? "Your account"}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {data?.email ?? session.role}
                                                </p>
                                            </div>
                                            <ul className="py-1">
                                                {accountLinks.map(({ href, label, icon: Icon }) => (
                                                    <li key={href}>
                                                        <Link
                                                            href={href}
                                                            onClick={() => setIsDropDownOpen(false)}
                                                            className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                                                        >
                                                            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                            {label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="border-t pt-1">
                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-destructive transition-colors hover:bg-secondary"
                                                >
                                                    <LogOut className="h-4 w-4" aria-hidden />
                                                    Sign out
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <ul className="py-1">
                                            <li>
                                                <Link
                                                    href="/auth/signin"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                                                >
                                                    <LogIn className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Sign in
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href="/auth/signup"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                                                >
                                                    <User className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Create an account
                                                </Link>
                                            </li>
                                            <li className="border-t pt-1 sm:hidden">
                                                <Link
                                                    href="/auth/vendor-signup"
                                                    onClick={() => setIsDropDownOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-secondary"
                                                >
                                                    <LayoutGrid className="h-4 w-4 text-muted-foreground" aria-hidden />
                                                    Join as a vendor
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            aria-label={showMenu ? "Close menu" : "Open menu"}
                            aria-expanded={showMenu}
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
                        >
                            {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden border-t lg:block">
                <div className="container-page flex h-12 items-center justify-between gap-6">
                    <NavCategory />

                    <nav aria-label="Main navigation">
                        <ul className="flex items-center gap-5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={isActive(path, link.href) ? "page" : undefined}
                                        className={cn(
                                            "text-sm font-medium transition-colors hover:text-primary",
                                            isActive(path, link.href)
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {!session?.isAuth && (
                        <Link
                            href="/auth/vendor-signup"
                            className="shrink-0 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                        >
                            Join as a vendor
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile navigation */}
            {showMenu && (
                <div className="border-t lg:hidden">
                    <div className="container-page py-4">
                        <div className="mb-4 md:hidden">
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
                                                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
                                                isActive(path, link.href)
                                                    ? "bg-secondary text-primary"
                                                    : "text-foreground"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="mt-3">
                            <NavCategory />
                        </div>
                        {!session?.isAuth && (
                            <Link
                                href="/auth/vendor-signup"
                                onClick={() => setShowMenu(false)}
                                className="mt-4 flex items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background"
                            >
                                Join as a vendor
                            </Link>
                        )}
                    </div>
                </div>
            )}

        </header>
        </>
    );
}
