import logoDark from "@/assets/images/logo-dark.png";
import { site } from "@/lib/site";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        title: "Quick links",
        links: [
            { href: "/products", label: "All products" },
            { href: "/flash-sale", label: "Deals" },
            { href: "/shops", label: "Verified shops" },
            { href: "/compare", label: "Compare" },
            { href: "/auth/vendor-signup", label: "Sell on OnnoMart" },
        ],
    },
    {
        title: "Customer care",
        links: [
            { href: "/auth/signin", label: "Sign in" },
            { href: "/auth/signup", label: "Create account" },
            { href: "/user/dashboard", label: "My account" },
            { href: "/user/purchased-items", label: "Order history" },
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

const payments = ["VISA", "Mastercard", "bKash", "Nagad", "COD"];

export default function Footer() {
    return (
        <footer className="bg-navy text-navy-foreground">
            <div className="container-page">
                <div className="grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <Link href="/" aria-label="OnnoMart home" className="inline-block">
                            <Image src={logoDark} alt="OnnoMart" className="h-8 w-auto" />
                        </Link>
                        <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-navy-foreground/65">
                            A multi-vendor marketplace in Bangladesh. Compare
                            products from verified shops, pay on delivery, and
                            send back what does not fit.
                        </p>

                        <ul className="mt-5 flex items-center gap-2">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-navy-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                                    >
                                        <Icon className="h-3.5 w-3.5" aria-hidden />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h2 className="text-[13px] font-bold text-navy-foreground">
                                {column.title}
                            </h2>
                            <ul className="mt-3.5 space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[12.5px] text-navy-foreground/65 transition-colors hover:text-navy-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h2 className="text-[13px] font-bold text-navy-foreground">
                            Contact us
                        </h2>
                        <ul className="mt-3.5 space-y-2.5 text-[12.5px] text-navy-foreground/65">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                                Dhaka, Bangladesh
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                                +880 1700 000000
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                                <a
                                    href={`mailto:${site.email}`}
                                    className="transition-colors hover:text-navy-foreground"
                                >
                                    {site.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-navy-foreground/55">
                        © {new Date().getFullYear()} {site.legalName}. All rights
                        reserved.
                    </p>

                    <ul className="flex flex-wrap items-center gap-1.5">
                        {payments.map((payment) => (
                            <li
                                key={payment}
                                className="rounded border border-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-navy-foreground/70"
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
