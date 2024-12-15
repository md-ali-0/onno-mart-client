"use client";

import { signout } from "@/actions/auth";
import logo from "@/assets/images/logo.png";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import {
    FileText,
    LayoutGrid,
    LogIn,
    Menu,
    Settings,
    ShoppingBag,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const path = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const cartProduct = useAppSelector((state) => state.cart.cart);
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
        <>
            <div className="w-full bg-gradient-to-r from-amber-600 to-orange-600 py-2 text-center text-sm text-white">
                <p>
                    🎉 Special Winter Offer! Get 25% OFF on all products with
                    code
                    {/* */} <span className="font-semibold">WINTER25</span>
                </p>
            </div>

            <header
                className={`bg-white flex border-b sm:px-0 px-4 min-h-[60px] tracking-wide z-50 transition-all duration-300 ease-in-out ${
                    isScrolled ? "fixed top-0 left-0 w-full" : "relative"
                }`}
            >
                <div className="container flex flex-wrap items-center justify-between py-3.5 px-4 lg:px-0 lg:gap-y-4 gap-y-6 gap-x-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={150}
                            height={80}
                            className="w-20 sm:w-36"
                        />
                    </Link>
                    <div
                        style={{ display: `${isOpen ? "block" : "none"}` }}
                        className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden text-white fixed top-2 right-2 z-[100] rounded-full p-3"
                        >
                            <X />
                        </button>
                        <ul className="lg:!flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-primary max-lg:w-full max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-4 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li className="mb-6 hidden max-lg:block">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        width={150}
                                        height={80}
                                        className="w-28 sm:w-36"
                                    />
                                </Link>
                            </li>

                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                    path == "/"
                                        ? "lg:after:w-full !text-primary"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full  lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    Home
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/products"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/products"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    Products
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/shop"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/shops"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    Shops
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/about"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/about"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    About
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/contact"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/contact"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center max-sm:ml-auto">
                        <ul className="flex gap-1.5 sm:gap-4">
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-9 sm:size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary hover:text-white">
                                <Link href="/cart">
                                    <span className="flex items-center justify-center bg-primary size-5 text-[11px] sm:text-xs absolute -top-[8px] -right-[8px] rounded-full text-white p-0.5 sm:p-2.5">
                                        {cartProduct.length}
                                    </span>
                                    <ShoppingCart size={18} />
                                </Link>
                            </li>
                            <div
                                onClick={() => setIsDropDownOpen(false)}
                                className={`fixed inset-0 w-full h-full ${
                                    isDropdownOpen ? "" : "hidden"
                                }`}
                            ></div>
                            {session?.isAuth ? (
                                <li className="group flex items-center justify-center bg-[#f8f7f7] size-9 sm:size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary">
                                    <button
                                        className="group-hover:text-white p-[12px] rounded-full"
                                        onClick={() =>
                                            setIsDropDownOpen(!isDropdownOpen)
                                        }
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center space-x-4">
                                                <Skeleton className="size-9 sm:size-10 rounded-full" />
                                            </div>
                                        ) : (
                                            <Avatar>
                                                <AvatarImage
                                                    src={data?.avatar}
                                                    alt={data?.name}
                                                />
                                                <AvatarFallback>
                                                    {data?.name.split("")[0]}
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
                                            {session?.role === "ADMIN" && (
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
                                                            size={20}
                                                            className="h-4 w-4 me-2"
                                                        />
                                                        Dashboard
                                                    </a>
                                                </li>
                                            )}
                                            {session?.role === "VENDOR" && (
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
                                                            size={20}
                                                            className="h-4 w-4 me-2"
                                                        />
                                                        Vendor Dashboard
                                                    </a>
                                                </li>
                                            )}
                                            {session?.role === "USER" && (
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
                                                                size={20}
                                                                className="h-4 w-4 me-2"
                                                            />
                                                            Account
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
                                                                size={20}
                                                                className="h-4 w-4 me-2"
                                                            />
                                                            Purchased Items
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
                                                                size={20}
                                                                className="h-4 w-4 me-2"
                                                            />
                                                            Transactions
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
                                                                size={20}
                                                                className="h-4 w-4 me-2"
                                                            />
                                                            Edit Profile
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
                                                        strokeWidth={2}
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
                                </li>
                            ) : (
                                <li className="group flex items-center justify-center bg-[#f8f7f7] size-9 sm:size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary">
                                    <button
                                        className="group-hover:text-white p-2.5 sm:p-[13px] rounded-full"
                                        onClick={() =>
                                            setIsDropDownOpen(!isDropdownOpen)
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
                                                        setIsDropDownOpen(false)
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
                                                        setIsDropDownOpen(false)
                                                    }
                                                >
                                                    <HiOutlineUserPlus
                                                        size={20}
                                                        className="h-4 w-4 me-2"
                                                    />
                                                    Sign Up
                                                </Link>
                                            </li>
                                            <li className="border-t border-gray-100 dark:border-gray-800 my-1" />
                                            <li className="ms-0">
                                                <Link
                                                    className="flex items-center py-1 px-4 hover:text-orange-500 text-[15px]"
                                                    href="/auth/vendor-signup"
                                                    onClick={() =>
                                                        setIsDropDownOpen(false)
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
                                </li>
                            )}
                        </ul>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden ml-2.5"
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
