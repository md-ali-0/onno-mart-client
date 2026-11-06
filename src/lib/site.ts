/**
 * Single place for everything that describes the site to crawlers and link
 * previews. Keep the URL in sync with the Vercel project domain, or set
 * NEXT_PUBLIC_SITE_URL when the deployment moves.
 */
export const site = {
    name: "OnnoMart",
    legalName: "OnnoMart",
    tagline: "A marketplace for everyday things",
    description:
        "OnnoMart is a multi-vendor marketplace in Bangladesh. Shop electronics, fashion, home, beauty and grocery from verified shops, compare products side by side, and pay with SSLCommerz, Aamarpay or cash on delivery.",
    shortDescription:
        "Multi-vendor marketplace in Bangladesh — electronics, fashion, home, beauty and grocery.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://onno-mart.vercel.app",
    apiUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://onnomart-api.vercel.app",
    locale: "en_BD",
    language: "en",
    currency: "BDT",
    currencySymbol: "৳",
    country: "BD",
    email: "support@onnomart.dev",
    twitter: "@onnomart",
    founded: "2024",
    keywords: [
        "OnnoMart",
        "online shopping Bangladesh",
        "multi vendor marketplace",
        "buy electronics online Dhaka",
        "fashion online store BD",
        "cash on delivery Bangladesh",
        "SSLCommerz checkout",
        "compare products",
    ],
    routes: {
        home: "/",
        products: "/products",
        shops: "/shops",
        flashSale: "/flash-sale",
        compare: "/compare",
        cart: "/cart",
        signin: "/auth/signin",
        signup: "/auth/signup",
        vendorSignup: "/auth/signup-vendor",
    },
} as const;

/** Routes that should never be indexed. */
export const privateRoutes = [
    "/dashboard",
    "/user",
    "/cart",
    "/payment",
    "/auth",
    "/compare",
];