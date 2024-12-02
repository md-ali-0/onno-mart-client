"use client";

import { FC, useState } from "react";

import logo from '@/assets/images/logo.png';
import { useSession } from "@/provider/session-provider";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const path = usePathname();

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const { session, setIsLoading } = useSession();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            // await signout();
            setIsLoading(false);
            toast.success("Logout Successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="flex bg-white border-b py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50">
            <div className="flex max-w-screen-xl mx-auto w-full">
                <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
                    <Link href="/" className="mr-auto">
                        <Image
                            src={logo}
                            alt="logo"
                            width={150}
                            height={100}
                            className="w-36"
                        />
                    </Link>
                    <div
                        style={{ display: `${isOpen ? "block" : "none"}` }}
                        className="lg:ml-6 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
                        >
                            <X />
                        </button>
                        <ul className="lg:flex lg:gap-x-6 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li className="mb-6 hidden max-lg:block">
                                <div className="flex items-center justify-between gap-4">
                                    <Link href="/">
                                        <Image
                                            src={logo}
                                            alt="logo"
                                            width={150}
                                            height={100}
                                            className="w-36"
                                        />
                                    </Link>
                                </div>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    Home
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/shop"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/shop"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/about"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/about"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    About
                                </Link>
                            </li>
                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/contact"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/contact"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li
                                className={`sm:hidden max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/auth/signin"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/auth/signin"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    Signin
                                </Link>
                            </li>
                            <li
                                className={`sm:hidden max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:bg-primary ${
                                    path == "/auth/signup"
                                        ? "lg:after:w-full"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full lg:after:h-[2px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/auth/signup"
                                    className="text-gray-800 dark:text-gray-300 text-[15px] font-medium"
                                >
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-x-6 gap-y-4 ml-auto">
                        <div className="flex bg-gray-50 border focus-within:bg-transparent focus-within:border-gray-300 rounded-full px-4 py-2.5 overflow-hidden max-w-52 max-lg:hidden">
                            <input
                                type="text"
                                placeholder="Search something..."
                                className="w-full text-sm bg-transparent outline-none pr-2"
                            />
                            <Search className="text-gray-400" size={20}/>
                        </div>
                        <div className="flex items-center sm:space-x-8 space-x-6">
                            <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="cursor-pointer fill-[#333] inline w-5 h-5"
                                        viewBox="0 0 64 64"
                                    >
                                        <path
                                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                    <span className="absolute left-auto -ml-1 top-0 rounded-full bg-primary px-1 py-0 text-xs text-white">
                                        0
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        height="20px"
                                        className="cursor-pointer fill-[#333] inline"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                            data-original="#000000"
                                        />
                                    </svg>
                                    <span className="absolute left-auto -ml-1 top-0 rounded-full bg-primary px-1 py-0 text-xs text-white">
                                        0
                                    </span>
                                </div>
                                
                            </div>
                            <Button className="max-lg:hidden px-5 py-3 rounded-full h-auto">
                                Sign In
                            </Button>
                            <button onClick={() => setIsOpen(true)} className="lg:hidden">
                                <Menu/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
