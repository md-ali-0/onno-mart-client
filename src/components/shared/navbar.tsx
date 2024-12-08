"use client";

import { signout } from "@/actions/auth";
import logo from "@/assets/images/logo.png";
import { useSession } from "@/provider/session-provider";
import { useGetMeQuery } from "@/redux/features/user/userApi";
import {
    FileText,
    Heart,
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
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
    const path = usePathname();

    const { session, setIsLoading } = useSession();

    const { data, isLoading } = useGetMeQuery(undefined);
    console.log(data);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signout();
            setIsLoading(false);
            toast.success("Logout Successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="min-h-[60px] tracking-wide border-b relative z-50">
            {/* <section className="bg-primary px-4 sm:px-0 py-1.5">
                <div className="container flex gap-3.5 items-center">
                    <Link
                        href={"tel:+8801916498482"}
                        className="flex items-center gap-2 text-white"
                    >
                        <PhoneCall className="inline" size={20} />
                        <span className="hidden sm:block">+880 190000000</span>
                    </Link>
                    <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                    <Link
                        href={"mailto:md.ali.office@gmail.com"}
                        className="flex items-center gap-2 text-white"
                    >
                        <Mail className="inline" size={20} />

                        <span className="hidden sm:block">
                            info@example.com
                        </span>
                    </Link>
                    <div className="ml-auto flex items-center text-white">
                        {!session?.isAuth && (
                            <>
                                <div className="hidden sm:block">
                                    <Link
                                        href={"/auth/vendor-signup"}
                                        className="flex items-center cursor-pointer text-sm border p-1 px-2"
                                    >
                                        Join as Vendor
                                    </Link>
                                </div>
                                <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                            </>
                        )}

                        <div className="relative cursor-pointer group hidden sm:block py-2.5">
                            <div className="flex items-center">
                                <Globe className="inline mr-1" size={20} />
                                <span>English</span>
                                <ChevronDown className="inline" size={18} />
                            </div>
                            <div className="absolute rounded right-0 sm:-right-2 mt-2 w-24 bg-white z-50 border border-gray-200 shadow-lg hidden group-hover:block">
                                <Link
                                    href="#"
                                    className="block px-3 py-1.5 text-black hover:bg-gray-100"
                                >
                                    English
                                </Link>
                            </div>
                        </div>
                        <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                        <div className="flex items-center gap-2 text-white">
                            <User className="inline" size={20} />
                            {session?.isAuth ? (
                                <div className="relative cursor-pointer group py-2.5">
                                    <div className="flex items-center">
                                        <span className="">My Account</span>
                                        <ChevronDown
                                            className="inline"
                                            size={18}
                                        />
                                    </div>
                                    <ul className="absolute rounded right-0 mt-2 w-32 bg-white z-50 border border-gray-200 shadow-lg hidden group-hover:block">
                                        {session.role === "ADMIN" && (
                                            <li>
                                                <Link
                                                    href="/dashboard"
                                                    className="block px-3 py-1.5 text-black hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        {session.role === "USER" && (
                                            <li>
                                                <Link
                                                    href="/user/dashboard"
                                                    className="block px-3 py-1.5 text-black hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}

                                        <li>
                                            <Link
                                                href="/user/profile"
                                                className="block px-4 py-2 text-black hover:bg-gray-100"
                                            >
                                                My Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <Link href={"/auth/signin"}>
                                        <span>Signin</span>
                                    </Link>
                                    /
                                    <Link href={"/auth/signup"}>
                                        <span>Signup</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section> */}
            <nav className="container">
                <div className="flex flex-wrap items-center justify-between py-3.5 px-4 sm:px-0 lg:gap-y-4 gap-y-6 gap-x-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={150}
                            height={80}
                            className="w-24 sm:w-36"
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
                            <li className="mb-6 hidden invert max-lg:block">
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
                                    path == "/shop"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/shop"
                                    className="text-white sm:text-[#1f0300] block uppercase text-[15px]"
                                >
                                    Shop
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
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary hover:text-white">
                                <Link href="/wishlist">
                                    <span className="flex items-center justify-center bg-primary size-5 text-xs absolute -top-[8px] -right-[8px] rounded-full text-white p-[13px]">
                                        0
                                    </span>
                                    <Heart size={18} />
                                </Link>
                            </li>
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary hover:text-white">
                                <Link href="/cart">
                                    <span className="flex items-center justify-center bg-primary size-5 text-xs absolute -top-[8px] -right-[8px] rounded-full text-white p-[13px]">
                                        0
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
                                <li className="group flex items-center justify-center bg-[#f8f7f7] size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary">
                                    <button
                                        className="group-hover:text-white p-[13px] rounded-full"
                                        onClick={() =>
                                            setIsDropDownOpen(!isDropdownOpen)
                                        }
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center space-x-4">
                                                <Skeleton className="size-10 rounded-full" />
                                            </div>
                                        ) : (
                                            <Avatar>
                                                <AvatarImage
                                                    src={data?.avatar}
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
                                            <li className="ms-0">
                                                <p className="text-slate-400 text-[15px] pt-2 px-4">
                                                    {data?.name}
                                                </p>
                                            </li>
                                            {session?.role === "ADMIN" && (
                                                <li>
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                        onClick={() =>
                                                            setIsDropDownOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            <li className="ms-0">
                                                <Link
                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                    href="/user/dashboard"
                                                    onClick={() =>
                                                        setIsDropDownOpen(false)
                                                    }
                                                >
                                                    <User
                                                        size={20}
                                                        className="h-4 w-4 me-2"
                                                    />
                                                    Account
                                                </Link>
                                            </li>
                                            <li className="ms-0">
                                                <Link
                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                    href="/user/purchased-items"
                                                    onClick={() =>
                                                        setIsDropDownOpen(false)
                                                    }
                                                >
                                                    <ShoppingBag
                                                        size={20}
                                                        className="h-4 w-4 me-2"
                                                    />
                                                    Purchased Items
                                                </Link>
                                            </li>
                                            <li className="ms-0">
                                                <Link
                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                    href="/user/transactions"
                                                    onClick={() =>
                                                        setIsDropDownOpen(false)
                                                    }
                                                >
                                                    <FileText
                                                        size={20}
                                                        className="h-4 w-4 me-2"
                                                    />
                                                    Transactions
                                                </Link>
                                            </li>
                                            <li className="ms-0">
                                                <Link
                                                    className="flex items-center py-2 px-4 hover:text-orange-500 text-[15px]"
                                                    href="/user/edit-profile"
                                                    onClick={() =>
                                                        setIsDropDownOpen(false)
                                                    }
                                                >
                                                    <Settings
                                                        size={20}
                                                        className="h-4 w-4 me-2"
                                                    />
                                                    Edit Profile
                                                </Link>
                                            </li>
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
                                <li className="group flex items-center justify-center bg-[#f8f7f7] size-10 rounded-full relative transition-all cursor-pointer transform duration-300 hover:bg-primary">
                                    <button
                                        className="group-hover:text-white p-[13px] rounded-full"
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
            </nav>
        </header>
    );
};

export default Navbar;
