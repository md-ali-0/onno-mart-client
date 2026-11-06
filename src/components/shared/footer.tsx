import logoDark from "@/assets/images/logo-dark.png";
import { site } from "@/lib/site";
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Truck,
    Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        title: "Shop",
        links: [
            { href: "/products", label: "All products" },
            { href: "/flash-sale", label: "Flash sale" },
            { href: "/shops", label: "Verified shops" },
            { href: "/compare", label: "Compare products" },
        ],
    },
    {
        title: "Your account",
        links: [
            { href: "/auth/signin", label: "Sign in" },
            { href: "/auth/signup", label: "Create account" },
            { href: "/user/dashboard", label: "My account" },
            { href: "/user/purchased-items", label: "Order history" },
            { href: "/cart", label: "Your cart" },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/contact", label: "Contact us" },
            { href: "/auth/vendor-signup", label: "Sell on OnnoMart" },
            { href: "/#newsletter", label: "Newsletter" },
            { href: "/contact", label: "Help & FAQ" },
        ],
    },
] as const;

const socials = [
    { href: "https://facebook.com/onnomart", label: "Facebook", icon: Facebook },
    { href: "https://x.com/onnomart", label: "X", icon: Twitter },
    { href: "https://instagram.com/onnomart", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com/company/onnomart", label: "LinkedIn", icon: Linkedin },
] as const;

export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-300">
            <div className="container-page py-12 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
                    <div className="max-w-sm">
                        <Link href="/" aria-label="OnnoMart home" className="inline-block">
                            <Image
                                src={logoDark}
                                alt="OnnoMart"
                                className="h-9 w-auto"
                            />
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                            A multi-vendor marketplace in Bangladesh. Compare
                            products from verified shops, pay on delivery, and
                            return what does not fit.
                        </p>

                        <ul className="mt-5 space-y-2 text-sm text-zinc-400">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                                <a href={`mailto:${site.email}`} className="hover:text-white">
                                    {site.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                                Dhaka, Bangladesh
                            </li>
                            <li className="flex items-center gap-2">
                                <Truck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                                Delivery in 24–48h inside Dhaka
                            </li>
                        </ul>

                        <ul className="mt-6 flex items-center gap-2">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-primary/50 hover:text-white"
                                    >
                                        <Icon className="h-4 w-4" aria-hidden />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                                {column.title}
                            </h2>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-400 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-zinc-500 sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} {site.legalName}. All rights
                        reserved.
                    </p>
                    <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        <span>Cash on delivery</span>
                        <span>SSLCommerz</span>
                        <span>7-day returns</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
