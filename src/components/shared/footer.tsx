import logo from "@/assets/images/logo-dark.png";
import Image from "next/image";
import Link from "next/link";
import {
    PiFacebookLogoFill,
    PiInstagramLogoFill,
    PiLinkedinLogoFill,
    PiTwitterLogoFill,
} from "react-icons/pi";

const Footer = () => {
    return (
        <footer className="bg-slate-900 overflow-hidden">
            <div className="relative z-10 pt-20">
                <div className="container mx-auto px-4 lg:px-0">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-full md:w-2/5">
                            <div className="mb-16 max-w-[310px]">
                                <Link href="/" className="mb-9 inline-block">
                                    <Image
                                        src={logo}
                                        alt="logo"
                                        width={150}
                                        height={80}
                                        className="max-w-full"
                                    />
                                </Link>
                                <p className="mb-9 flex items-center  text-white">
                                    Discover a vibrant marketplace where
                                    multiple vendors bring you a diverse
                                    selection of products. Shop securely,
                                    support independent sellers, and enjoy a
                                    seamless shopping experience all in one
                                    place.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between md:w-3/5">
                            <div className="md:w-2/5">
                                <div className="mb-16">
                                    <h3 className="pb-5 text-xl font-semibold text-white">
                                        Important Links
                                    </h3>
                                    <span className="mb-8 block h-[3px] w-10 rounded bg-white" />
                                    <ul className="space-y-3">
                                        <li>
                                            <a
                                                href="/"
                                                className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline"
                                            >
                                                About us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline"
                                            >
                                                Contact Us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline"
                                            >
                                                Faq
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline"
                                            >
                                                Latest Posts
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="text-base text-[#cacbcf] transition-all hover:text-white hover:underline"
                                            >
                                                Order Track
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="md:w-3/5">
                                <div className="mb-16">
                                    <h3 className="pb-5 text-xl font-semibold text-white">
                                        Newsletter
                                    </h3>
                                    <span className="mb-8 block h-[3px] w-10 rounded bg-white" />
                                    <div>
                                        <p className="mb-8 text-base text-[#cacbcf]">
                                            Enter your email to receive our
                                            latest updates about our products.
                                        </p>
                                        <form className="relative overflow-hidden">
                                            <input
                                                type="email"
                                                placeholder="Email address"
                                                className="h-[50px] w-full bg-[#1f2735] pl-5 sm:pr-[125px] text-[#CACBCF] outline-none placeholder:text-[#CACBCF]"
                                            />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-blue-dark">
                                                Subscribe
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#2E3842] py-4">
                <div className="container px-4 lg:px-0 mx-auto">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="order-last w-full md:w-1/2 lg:order-first lg:w-5/12 xl:w-1/3">
                            <p className="text-center text-base text-[#CACBCF] lg:text-left">
                                © {new Date().getFullYear()} Onno Mart. All
                                Rights Reserved.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-3/12 xl:w-1/3">
                            <div className="mb-5 flex items-center justify-center space-x-[18px] md:justify-end lg:mb-0">
                                <span className="text-base text-white">
                                    Follow Us:
                                </span>
                                <Link
                                    href="https://facebook.com/onnomart"
                                    className="text-white/50 hover:text-white"
                                >
                                    <PiFacebookLogoFill size={25} />
                                </Link>
                                <Link
                                    href="https://x.com/onnomart"
                                    className="text-white/50 hover:text-white"
                                >
                                    <PiTwitterLogoFill size={25} />
                                </Link>
                                <Link
                                    href="https://instagram.com/onnomart"
                                    className="text-white/50 hover:text-white"
                                >
                                    <PiInstagramLogoFill size={25} />
                                </Link>
                                <Link
                                    href="https://linkedin.com/onnomart"
                                    className="text-white/50 hover:text-white"
                                >
                                    <PiLinkedinLogoFill size={25} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
