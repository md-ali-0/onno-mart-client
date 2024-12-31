"use client";

import { signout } from "@/actions/auth";
import logoSm from "@/assets/images/log-sm.png";
import logo from "@/assets/images/logo.png";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    ArrowLeftRight,
    Box,
    FileText,
    LayoutGrid,
    LogIn,
    Menu,
    Percent,
    Settings,
    ShoppingBag,
    ShoppingBasket,
    ShoppingCart,
    Star,
    User,
    X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { MegaMenu } from "./mega-menu";
import NavCategory from "./nav-category";
import NavbarCategorySearch from "./navbar-category-search";

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const path = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const cartProduct = useAppSelector((state) => state.cart.cart);
    const compareProduct = useAppSelector((state) => state.compare.compare);
    const router = useRouter();
    const { session, setIsLoading } = useSession();

    const { data, isLoading, refetch } = useGetMeQuery(undefined);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("accessToken");
            await signout();
            refetch();
            setIsLoading(false);
            router.replace("/auth/signin");
            toast.success("Logout Successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        if (!session?.role) {
            refetch();
        }
    }, [session?.role, refetch]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="w-full bg-white dark:bg-dark">
            {/* <div className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-2 text-center text-sm text-white">
                <p>
                    🚀 Special Winter Offer! Get 25% OFF on all products with
                    code
                    <span className="font-semibold">WINTER25</span>
                </p>
            </div> */}
            <div
                className={`border-b ${
                    isScrolled
                        ? "fixed top-0 left-0 w-full z-50 bg-white"
                        : "relative"
                }`}
            >
                <div className="w-full border-b border-stroke dark:border-dark-3 lg:py-4">
                    <div className="container px-4 lg:px-0 mx-auto">
                        <div className="relative flex items-center justify-between">
                            <div className="w-48 max-w-full sm:w-60 lg:w-48">
                                <Link href="/" className="block w-full py-3">
                                    <Image
                                        src={logo.src}
                                        alt="logo"
                                        width={150}
                                        height={80}
                                        className="hidden w-full sm:block"
                                    />
                                    <Image
                                        src={logoSm.src}
                                        alt="logo"
                                        width={100}
                                        height={100}
                                        className="max-w-16 sm:hidden"
                                    />
                                </Link>
                            </div>
                            <div className="items-center justify-end w-full sm:flex lg:justify-between ml-20">
                                <NavbarCategorySearch />
                                <div className="flex items-center justify-end w-full space-x-4">
                                    <div className="relative z-20">
                                        <div className="flex max-w-[200px] justify-end">
                                            <Button
                                                onClick={() =>
                                                    setWishlistOpen(
                                                        !wishlistOpen
                                                    )
                                                }
                                                className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 text-dark dark:text-white"
                                                size={"icon"}
                                                variant={"outline"}
                                            >
                                                <Link
                                                    href={"/compare"}
                                                    className="p-2.5"
                                                >
                                                    <ArrowLeftRight size={20} />

                                                    <span className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-primary leading-[18px] text-[10px] font-semibold text-white">
                                                        {compareProduct.length}
                                                    </span>
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="relative z-20">
                                        <div className="flex max-w-[200px] justify-end">
                                            <button className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 text-dark dark:text-white">
                                                <Link
                                                    href={"/cart"}
                                                    className="p-2.5"
                                                >
                                                    <ShoppingBasket size={20} />
                                                    <span className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-primary leading-[18px] text-[10px] font-semibold text-white">
                                                        {cartProduct.length}
                                                    </span>
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="relative z-20">
                                        {session?.isAuth ? (
                                            <div className="relative">
                                                <button
                                                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 text-dark dark:text-white"
                                                    onClick={() =>
                                                        setIsDropDownOpen(
                                                            !isDropdownOpen
                                                        )
                                                    }
                                                >
                                                    {isLoading ? (
                                                        <div className="flex items-center space-x-4">
                                                            <Skeleton className="size-8 sm:size-10 rounded-full" />
                                                        </div>
                                                    ) : (
                                                        <Avatar>
                                                            <AvatarImage
                                                                src={
                                                                    data?.avatar
                                                                }
                                                                alt={data?.name}
                                                            />
                                                            <AvatarFallback>
                                                                {
                                                                    data?.name.split(
                                                                        ""
                                                                    )[0]
                                                                }
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </button>

                                                <div
                                                    className="absolute top-[38px] end-0 m-0 mt-4 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 border dark:shadow-gray-700 z-10"
                                                    style={{
                                                        display: `${
                                                            isDropdownOpen
                                                                ? "block"
                                                                : "none"
                                                        }`,
                                                    }}
                                                >
                                                    <ul className="py-2 text-start">
                                                        {session?.role ===
                                                            "ADMIN" && (
                                                            <li>
                                                                <a
                                                                    href="/dashboard"
                                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                    onClick={() =>
                                                                        setIsDropDownOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    <LayoutGrid
                                                                        size={
                                                                            20
                                                                        }
                                                                        className="h-4 w-4 me-2"
                                                                    />
                                                                    Dashboard
                                                                </a>
                                                            </li>
                                                        )}
                                                        {session?.role ===
                                                            "VENDOR" && (
                                                            <li>
                                                                <a
                                                                    href="/dashboard"
                                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                    onClick={() =>
                                                                        setIsDropDownOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                >
                                                                    <LayoutGrid
                                                                        size={
                                                                            20
                                                                        }
                                                                        className="h-4 w-4 me-2"
                                                                    />
                                                                    Vendor
                                                                    Dashboard
                                                                </a>
                                                            </li>
                                                        )}
                                                        {session?.role ===
                                                            "USER" && (
                                                            <>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/dashboard"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <User
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Account
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/recent-view-products"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <ShoppingCart
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Recent
                                                                        Products
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/purchased-items"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <ShoppingBag
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Purchased
                                                                        Items
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/my-reviews"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <Star
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        My
                                                                        Reviews
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/transactions"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <FileText
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Transactions
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/favorite-seller"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <Box
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Favorite
                                                                        Sellers
                                                                    </a>
                                                                </li>
                                                                <li className="ms-0">
                                                                    <a
                                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                        href="/user/edit-profile"
                                                                        onClick={() =>
                                                                            setIsDropDownOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <Settings
                                                                            size={
                                                                                20
                                                                            }
                                                                            className="h-4 w-4 me-2"
                                                                        />
                                                                        Edit
                                                                        Profile
                                                                    </a>
                                                                </li>
                                                            </>
                                                        )}
                                                        <li className="border-t border-gray-100 dark:border-gray-800 my-1" />
                                                        <li className="ms-0">
                                                            <button
                                                                className="flex items-center py-1 px-4 hover:text-orange-500 text-[15px]"
                                                                onClick={() => {
                                                                    setIsDropDownOpen(
                                                                        false
                                                                    );
                                                                    handleLogout();
                                                                }}
                                                            >
                                                                <svg
                                                                    stroke="currentColor"
                                                                    fill="none"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    viewBox="0 0 24 24"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="h-4 w-4 me-2"
                                                                    height="1em"
                                                                    width="1em"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                                    <polyline points="16 17 21 12 16 7" />
                                                                    <line
                                                                        x1={21}
                                                                        y1={12}
                                                                        x2={9}
                                                                        y2={12}
                                                                    />
                                                                </svg>
                                                                Logout
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <button
                                                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[.5px] border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 text-dark dark:text-white"
                                                    onClick={() =>
                                                        setIsDropDownOpen(
                                                            !isDropdownOpen
                                                        )
                                                    }
                                                >
                                                    <User size={18} />
                                                </button>

                                                <div
                                                    className="absolute top-[38px] end-0 m-0 mt-4 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 border dark:shadow-gray-700 z-10"
                                                    style={{
                                                        display: `${
                                                            isDropdownOpen
                                                                ? "block"
                                                                : "none"
                                                        }`,
                                                    }}
                                                >
                                                    <ul className="py-2 text-start">
                                                        <li className="ms-0">
                                                            <Link
                                                                className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                href="/auth/signin"
                                                                onClick={() =>
                                                                    setIsDropDownOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <LogIn
                                                                    size={20}
                                                                    className="h-4 w-4 me-2"
                                                                />
                                                                Sign In
                                                            </Link>
                                                        </li>
                                                        <li className="ms-0">
                                                            <Link
                                                                className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                                href="/auth/signup"
                                                                onClick={() =>
                                                                    setIsDropDownOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <HiOutlineUserPlus
                                                                    size={20}
                                                                    className="h-4 w-4 me-2"
                                                                />
                                                                Sign Up
                                                            </Link>
                                                        </li>
                                                        <li className="border-t border-gray-100 dark:border-gray-800 my-1 sm:hidden" />
                                                        <li className="ms-0 sm:hidden">
                                                            <Link
                                                                className="flex items-center py-1 px-4 hover:text-orange-500 text-[15px]"
                                                                href="/auth/vendor-signup"
                                                                onClick={() =>
                                                                    setIsDropDownOpen(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <GrUserManager
                                                                    size={20}
                                                                    className="h-4 w-4 me-2"
                                                                />
                                                                Join as Vendor
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container px-4 lg:px-0 mx-auto">
                        <div className="relative flex items-center justify-between">
                            <NavCategory />
                            <div className="flex items-center justify-between">
                                <div className="w-full text-right">
                                    <Button
                                        className="lg:hidden"
                                        onClick={() => setShowMenu(!showMenu)}
                                        size={"icon"}
                                    >
                                        {showMenu ? (
                                            <X size={25} />
                                        ) : (
                                            <Menu size={25} />
                                        )}
                                    </Button>
                                    <nav
                                        className="absolute right-4 top-full z-50 sm:z-10 w-full max-w-[250px] justify-center rounded-lg bg-white dark:bg-dark-2 py-5 px-6 shadow lg:static lg:w-full lg:max-w-full lg:justify-end lg:bg-transparent lg:py-0 lg:px-0 lg:shadow-none dark:lg:bg-transparent lg:!flex"
                                        style={{
                                            display: `${
                                                showMenu ? "block" : "none"
                                            }`,
                                        }}
                                    >
                                        <ul className="items-center block lg:flex">
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/">Home</Link>
                                            </li>
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/products"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/products">
                                                    Products
                                                </Link>
                                            </li>
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/flash-sale"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/flash-sale">
                                                    Flash Sale
                                                </Link>
                                            </li>
                                            <li
                                                className={`relative hidden md:block group hover:text-primary font-medium`}
                                            >
                                                <button className="text-base relative inline-flex active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none">
                                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a00_0%,#ff4d4f_50%,#ff6db6_100%)]"></span>
                                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-2 py-1 text-sm font-medium text-orange-600 backdrop-blur-3xl gap-2 undefined">
                                                        Offer
                                                        <Percent size={15} />
                                                    </span>
                                                </button>
                                                <MegaMenu />
                                            </li>
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/shops" || path == "/shop"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/shops">Shop</Link>
                                            </li>
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/compare"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/compare">
                                                    Compare
                                                </Link>
                                            </li>
                                            <li
                                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                                    path == "/contact"
                                                        ? "lg:after:w-full !text-primary"
                                                        : "lg:after:w-0"
                                                } lg:hover:after:w-full font-medium lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300 lg:mx-4 lg:inline-flex`}
                                            >
                                                <Link href="/contact">
                                                    Contact Us
                                                </Link>
                                            </li>
                                            {!session?.isAuth && (
                                                <li className="hidden sm:block">
                                                    <Button
                                                        asChild
                                                        variant={"default"}
                                                        className="bg-gray-900 text-white hover:text-white"
                                                    >
                                                        <Link href="/auth/vendor-signup">
                                                            Join as a Vendor
                                                        </Link>
                                                    </Button>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div
                                onClick={() => setShowMenu(false)}
                                className={`fixed inset-0 w-full h-full ${
                                    showMenu ? "" : "hidden"
                                }`}
                            ></div>
                            <div
                                onClick={() => setIsDropDownOpen(false)}
                                className={`fixed inset-0 w-full h-full ${
                                    isDropdownOpen ? "" : "hidden"
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
