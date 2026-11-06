import { site } from "@/lib/site";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const columns = [
    {
        title: "Shop",
        links: [
            { href: "/products", label: "All products" },
            { href: "/flash-sale", label: "The private sale" },
            { href: "/shops", label: "Verified shops" },
            { href: "/compare", label: "Compare" },
        ],
    },
    {
        title: "Account",
        links: [
            { href: "/auth/signin", label: "Sign in" },
            { href: "/auth/signup", label: "Create account" },
            { href: "/user/dashboard", label: "My account" },
            { href: "/user/purchased-items", label: "Order history" },
        ],
    },
    {
        title: "Care",
        links: [
            { href: "/contact", label: "Contact us" },
            { href: "/contact", label: "Delivery & returns" },
            { href: "/auth/vendor-signup", label: "Sell with us" },
            { href: "/#newsletter", label: "The list" },
        ],
    },
] as const;

const socials = [
    { href: "https://facebook.com/onnomart", label: "Facebook", icon: Facebook },
    { href: "https://x.com/onnomart", label: "X", icon: Twitter },
    { href: "https://instagram.com/onnomart", label: "Instagram", icon: Instagram },
    { href: "https://linkedin.com/company/onnomart", label: "LinkedIn", icon: Linkedin },
] as const;

const payments = ["Visa", "Mastercard", "bKash", "Nagad", "Cash on delivery"];

export default function Footer() {
    return (
        <footer className="bg-navy text-navy-foreground">
            <div className="container-page">
                <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
                    <div>
                        <Link href="/" aria-label="OnnoMart home" className="inline-block">
                            <span className="font-display text-[24px] leading-none tracking-[-0.02em] text-navy-foreground">
                                OnnoMart
                            </span>
                        </Link>
                        <p className="mt-5 max-w-xs text-[13px] leading-[1.8] text-navy-foreground/60">
                            A multi-vendor marketplace in Dhaka. Verified shops,
                            honest prices, and a return policy that does not
                            require an argument.
                        </p>

                        <ul className="mt-6 flex items-center gap-3">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-8 w-8 items-center justify-center border border-white/15 text-navy-foreground/70 transition-colors hover:border-navy-foreground/50 hover:text-navy-foreground"
                                    >
                                        <Icon className="h-3.5 w-3.5" aria-hidden />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h2 className="text-[13px] font-semibold text-navy-foreground">
                                {column.title}
                            </h2>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] text-navy-foreground/60 transition-colors hover:text-primary-foreground"
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
                <div className="container-page flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-navy-foreground/45">
                        © {new Date().getFullYear()} {site.legalName} · Dhaka
                    </p>

                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {payments.map((payment) => (
                            <li
                                key={payment}
                                className="text-[9px] uppercase tracking-[0.14em] text-navy-foreground/40"
                            >
                                {payment}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
