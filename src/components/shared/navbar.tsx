"use client";

import logo from "@/assets/images/logo.png";
import { useSession } from "@/provider/session-provider";
import {
    ChevronDown,
    Globe,
    Heart,
    Mail,
    Menu,
    PhoneCall,
    Search,
    ShoppingCart,
    User,
    X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";

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
        <header className="min-h-[60px] tracking-wide relative z-50">
            <section className="bg-primary px-4 py-4">
                <div className="container flex items-center">
                    <Link
                        href={"tel:+8801916498482"}
                        className="flex items-center gap-2 text-white"
                    >
                        <PhoneCall className="inline" size={20} />
                        +880 190000000
                    </Link>
                    <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                    <Link
                        href={"mailto:md.ali.office@gmail.com"}
                        className="flex items-center gap-2 text-white"
                    >
                        <Mail className="inline" size={20} />
                        info@example.com
                    </Link>
                    <div className="sm:ml-auto flex items-center text-white">
                        <div className="relative group">
                            <div className="flex items-center cursor-pointer">
                                <Globe className="inline mr-1" size={20} />
                                <span>English</span>
                                <ChevronDown className="inline" size={18} />
                            </div>
                            <div className="absolute left-0 mt-2 w-32 bg-white z-50 border border-gray-200 shadow-lg hidden group-hover:block">
                                <Link
                                    href="#"
                                    className="block px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    English
                                </Link>
                            </div>
                        </div>
                        <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                        <div className="relative group">
                            <div className="flex items-center cursor-pointer">
                                <Globe className="inline mr-1" size={20} />
                                <span>USD</span>
                                <ChevronDown className="inline" size={18} />
                            </div>
                            <div className="absolute left-0 mt-2 w-32 bg-white z-50 border border-gray-200 shadow-lg hidden group-hover:block">
                                <Link
                                    href="#"
                                    className="block px-4 py-2 text-black hover:bg-gray-100"
                                >
                                    USD
                                </Link>
                            </div>
                        </div>
                        <span className="border-l border-gray-300 h-4 mx-3 max-sm:hidden" />
                        <Link
                            href={"mailto:md.ali.office@gmail.com"}
                            className="flex items-center gap-2 text-white"
                        >
                            <User className="inline" size={20} />
                            My Account
                        </Link>
                    </div>
                </div>
            </section>
            <nav className="container">
                <div className="flex flex-wrap items-center justify-between py-8 px-4 sm:px-0 lg:gap-y-4 gap-y-6 gap-x-4">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="logo"
                            width={150}
                            height={80}
                            className="w-36"
                        />
                    </Link>
                    <div
                        style={{ display: `${isOpen ? "block" : "none"}` }}
                        className="max-lg:hidden lg:!flex lg:items-center max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden bg-primary text-white fixed top-2 right-4 z-[100] rounded-full p-3"
                        >
                            <X />
                        </button>
                        <ul className="lg:!flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-primary max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                            <li className="mb-6 hidden max-lg:block">
                                <Link href="/">
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        width={150}
                                        height={80}
                                        className="w-36"
                                    />
                                </Link>
                            </li>

                            <li
                                className={`max-lg:border-b max-lg:py-3 relative lg:after:absolute hover:text-primary lg:after:bg-primary ${
                                    path == "/"
                                        ? "lg:after:w-full text-primary"
                                        : "lg:after:w-0"
                                } lg:hover:after:w-full  lg:after:h-[1px] lg:after:block lg:after:-bottom-1 lg:after:transition-all lg:after:duration-300`}
                            >
                                <Link
                                    href="/"
                                    className="text-white sm:text-[#1f0300] block uppercase"
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
                                    className="text-white sm:text-[#1f0300] block uppercase"
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
                                    className="text-white sm:text-[#1f0300] block uppercase"
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
                                    className="text-white sm:text-[#1f0300] block uppercase"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center max-sm:ml-auto">
                        <ul className="flex space-x-4">
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-12 rounded-full relative transition-all transform duration-300 hover:bg-primary hover:text-white">
                                <button id="searchIcon">
                                    <Search size={22} />
                                </button>
                            </li>
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-12 rounded-full relative transition-all transform duration-300 hover:bg-primary hover:text-white">
                                <Link href="/wishlist">
                                    <span className="flex items-center justify-center bg-primary size-[25px] absolute -top-[10px] -right-[10px] rounded-full text-white">
                                        0
                                    </span>
                                    <Heart size={22} />
                                </Link>
                            </li>
                            <li className="flex items-center justify-center bg-[#f8f7f7] size-12 rounded-full relative transition-all transform duration-300 hover:bg-primary hover:text-white">
                                <Link href="/cart">
                                    <span className="flex items-center justify-center bg-primary size-[25px] absolute -top-[10px] -right-[10px] rounded-full text-white">
                                        0
                                    </span>
                                    <ShoppingCart size={22} />
                                </Link>
                            </li>
                        </ul>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="lg:hidden ml-6"
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
