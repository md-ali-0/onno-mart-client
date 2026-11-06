import { SessionProvider } from "@/provider/session-provider";
import ReduxProvider from "@/provider/redux-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { site } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "../styles/globals.css";

/**
 * Instrument Serif for display type and Instrument Sans for everything else.
 * Both are self-hosted (15 kB + 30 kB) so the build has no network dependency.
 * The serif only ever appears at large sizes — that is what makes it read as
 * expensive rather than decorative.
 */
const display = localFont({
    src: "../assets/fonts/instrument-serif.woff2",
    weight: "400",
    style: "normal",
    variable: "--font-display",
    display: "swap",
    fallback: ["Georgia", "Times New Roman", "serif"],
    adjustFontFallback: false,
});

const sans = localFont({
    src: "../assets/fonts/instrument-sans-variable.woff2",
    weight: "400 700",
    style: "normal",
    variable: "--font-sans",
    display: "swap",
    fallback: ["system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
    adjustFontFallback: false,
});

const homeTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: homeTitle,
        template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    keywords: [...site.keywords],
    authors: [{ name: "Mohammad Ali", url: "https://github.com/md-ali-0" }],
    creator: "Mohammad Ali",
    publisher: site.legalName,
    category: "shopping",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: site.locale,
        url: site.url,
        siteName: site.name,
        title: homeTitle,
        description: site.shortDescription,
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: `${site.name} — ${site.tagline}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: homeTitle,
        description: site.shortDescription,
        images: ["/opengraph-image"],
        creator: site.twitter,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    formatDetection: {
        telephone: false,
        address: false,
        email: false,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
        { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
    ],
    colorScheme: "light dark",
};

const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon`,
    description: site.description,
    email: site.email,
    foundingDate: site.founded,
    areaServed: { "@type": "Country", name: "Bangladesh" },
    currenciesAccepted: site.currency,
    paymentAccepted: "SSLCommerz, Aamarpay, Cash on Delivery",
    sameAs: ["https://github.com/md-ali-0"],
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: site.language,
    potentialAction: {
        "@type": "SearchAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/products?searchTerm={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang={site.language}
            className={`${sans.variable} ${display.variable}`}
            suppressHydrationWarning
        >
            <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
                >
                    Skip to content
                </a>
                <SessionProvider>
                    <ReduxProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                            <Toaster richColors expand position="top-center" />
                        </ThemeProvider>
                    </ReduxProvider>
                </SessionProvider>
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([organisationSchema, websiteSchema]),
                    }}
                />
            </body>
        </html>
    );
}