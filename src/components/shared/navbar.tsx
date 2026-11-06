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
    { href: "/products", label: "Shop" },
    { href: "/flash-sale", label: "Sale" },
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
        <span className="absolute -right-1.5 -top-1.5 flex h-[15px] min-w-[15px] items-center justify-center bg-primary px-1 text-[9px] font-semibold leading-none text-primary-foreground">
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
                "relative flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
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
            <header className="sticky top-0 z-50 w-full border-b bg-background">
                <div className="container-page">
                    <div className="flex h-[66px] items-center gap-4 sm:gap-7">
                        <Link
                            href="/"
                            className="flex shrink-0 items-center"
                            aria-label="OnnoMart home"
                        >
                            <Image
                                src={logo}
                                alt="OnnoMart"
                                className="h-7 w-auto sm:h-8"
                                priority
                            />
                        </Link>

                        <div className="hidden min-w-0 flex-1 md:block">
                            <NavbarCategorySearch />
                        </div>

                        <div className="ml-auto flex items-center gap-0.5">
                            <IconLink
                                href="/products"
                                label="Search products"
                                className="md:hidden"
                            >
                                <Search className="h-[18px] w-[18px]" />
                            </IconLink>
                            <IconLink
                                href="/compare"
                                label="Compare products"
                                count={compareCount}
                            >
                                <ArrowLeftRight className="h-[18px] w-[18px]" />
                            </IconLink>
                            <IconLink href="/cart" label="Cart" count={cartCount}>
                                <ShoppingCart className="h-[18px] w-[18px]" />
                            </IconLink>

                            <div className="relative">
                                <button
                                    type="button"
                                    aria-label="Account menu"
                                    aria-expanded={isDropdownOpen}
                                    onClick={() => setIsDropDownOpen(!isDropdownOpen)}
                                    className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {session?.isAuth ? (
                                        isLoading ? (
                                            <Skeleton className="h-7 w-7 rounded-full" />
                                        ) : (
                                            <Avatar className="h-7 w-7">
                                                <AvatarImage
                                                    src={data?.avatar}
                                                    alt={data?.name ?? "Your avatar"}
                                                />
                                                <AvatarFallback className="bg-secondary text-[10px] font-semibold">
                                                    {data?.name?.[0]?.toUpperCase() ?? "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        )
                                    ) : (
                                        <User className="h-[18px] w-[18px]" />
                                    )}
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-3 w-64 border bg-card py-2 shadow-lift">
                                        {session?.isAuth ? (
                                            <>
                                                <div className="border-b px-4 pb-2.5 pt-1">
                                                    <p className="truncate font-display text-[15px]">
                                                        {data?.name ?? "Your account"}
                                                    </p>
                                                    <p className="truncate text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                                                        {data?.email ?? session.role}
                                                    </p>
                                                </div>
                                                <ul className="py-1">
                                                    {accountLinks.map(({ href, label, icon: Icon }) => (
                                                        <li key={href}>
                                                            <Link
                                                                href={href}
                                                                onClick={() => setIsDropDownOpen(false)}
                                                                className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors hover:bg-secondary"
                                                            >
                                                                <Icon
                                                                    className="h-3.5 w-3.5 text-muted-foreground"
                                                                    aria-hidden
                                                                />
                                                                {label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="border-t pt-1">
                                                    <button
                                                        type="button"
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-destructive transition-colors hover:bg-secondary"
                                                    >
                                                        <LogOut className="h-3.5 w-3.5" aria-hidden />
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
                                                        className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors hover:bg-secondary"
                                                    >
                                                        <LogIn
                                                            className="h-3.5 w-3.5 text-muted-foreground"
                                                            aria-hidden
                                                        />
                                                        Sign in
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/auth/signup"
                                                        onClick={() => setIsDropDownOpen(false)}
                                                        className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors hover:bg-secondary"
                                                    >
                                                        <User
                                                            className="h-3.5 w-3.5 text-muted-foreground"
                                                            aria-hidden
                                                        />
                                                        Create an account
                                                    </Link>
                                                </li>
                                                <li className="border-t pt-1 sm:hidden">
                                                    <Link
                                                        href="/auth/vendor-signup"
                                                        onClick={() => setIsDropDownOpen(false)}
                                                        className="flex items-center gap-2.5 px-4 py-2 text-[13px] transition-colors hover:bg-secondary"
                                                    >
                                                        <LayoutGrid
                                                            className="h-3.5 w-3.5 text-muted-foreground"
                                                            aria-hidden
                                                        />
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
                                className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                            >
                                {showMenu ? (
                                    <X className="h-[18px] w-[18px]" />
                                ) : (
                                    <Menu className="h-[18px] w-[18px]" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop navigation */}
                <div className="hidden border-t lg:block">
                    <div className="container-page flex h-11 items-center justify-between gap-6">
                        <NavCategory />

                        <nav aria-label="Main navigation">
                            <ul className="flex items-center gap-6">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            aria-current={
                                                isActive(path, link.href)
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={cn(
                                                "text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
                                                isActive(path, link.href)
                                                    ? "text-primary"
                                                    : "text-muted-foreground hover:text-foreground"
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
                                className="shrink-0 border-b border-foreground/40 pb-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-primary hover:text-primary"
                            >
                                Sell on OnnoMart
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile navigation */}
                {showMenu && (
                    <div className="border-t lg:hidden">
                        <div className="container-page py-5">
                            <div className="mb-5 md:hidden">
                                <NavbarCategorySearch />
                            </div>
                            <nav aria-label="Mobile navigation">
                                <ul className="grid grid-cols-2 gap-x-4">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.href} className="border-b">
                                            <Link
                                                href={link.href}
                                                onClick={() => setShowMenu(false)}
                                                className={cn(
                                                    "block py-3 text-[12px] font-semibold uppercase tracking-[0.12em]",
                                                    isActive(path, link.href)
                                                        ? "text-primary"
                                                        : "text-foreground"
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="mt-4">
                                <NavCategory />
                            </div>
                            {!session?.isAuth && (
                                <Link
                                    href="/auth/vendor-signup"
                                    onClick={() => setShowMenu(false)}
                                    className="mt-5 flex items-center justify-center bg-foreground px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-background"
                                >
                                    Sell on OnnoMart
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
