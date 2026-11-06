import logoDark from "@/assets/images/logo-dark.png";
import { site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
    {
        title: "Shop",
        links: [
            { href: "/products", label: "All products" },
            { href: "/flash-sale", label: "On sale" },
            { href: "/shops", label: "Verified shops" },
            { href: "/compare", label: "Compare" },
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
    { href: "https://facebook.com/onnomart", label: "Facebook" },
    { href: "https://x.com/onnomart", label: "X" },
    { href: "https://instagram.com/onnomart", label: "Instagram" },
    { href: "https://linkedin.com/company/onnomart", label: "LinkedIn" },
] as const;

export default function Footer() {
    return (
        <footer className="bg-forest text-forest-foreground">
            <div className="container-page">
                <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:gap-12">
                    <div className="max-w-sm">
                        <Link href="/" aria-label="OnnoMart home" className="inline-block">
                            <Image src={logoDark} alt="OnnoMart" className="h-8 w-auto" />
                        </Link>
                        <p className="mt-5 text-[13px] leading-relaxed text-forest-foreground/75">
                            A multi-vendor marketplace in Bangladesh. Compare
                            products from verified shops, pay on delivery, and
                            send back what does not fit.
                        </p>
                        <ul className="mt-5 space-y-1.5 text-[13px] text-forest-foreground/75">
                            <li>
                                <a
                                    href={`mailto:${site.email}`}
                                    className="transition-colors hover:text-forest-foreground"
                                >
                                    {site.email}
                                </a>
                            </li>
                            <li>Dhaka, Bangladesh</li>
                        </ul>
                    </div>

                    {columns.map((column) => (
                        <div key={column.title}>
                            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-forest-foreground/55">
                                {column.title}
                            </h2>
                            <ul className="mt-4 space-y-2.5">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[13px] text-forest-foreground/80 transition-colors hover:text-forest-foreground"
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
                <div className="container-page flex flex-col gap-4 py-5 text-[10px] uppercase tracking-[0.14em] text-forest-foreground/55 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {site.legalName}
                    </p>

                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {socials.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors hover:text-forest-foreground"
                                >
                                    {social.label}
                                    <ArrowUpRight className="h-2.5 w-2.5" aria-hidden />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <p>Cash on delivery · SSLCommerz · 7-day returns</p>
                </div>
            </div>
        </footer>
    );
}
