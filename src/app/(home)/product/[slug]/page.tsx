import ProductDetailsFooter from "@/components/product/product-details-footer";
import ProductGallery from "@/components/product/product-gallery";
import RelatedProducts from "@/components/product/related-product";
import StarRating from "@/components/product/star-rating";
import { discountedPrice, formatPrice, savingsPercent, truncate } from "@/lib/format";
import { getProductBySlug, getProducts } from "@/lib/get-products";
import { site } from "@/lib/site";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import ProductActions from "./product-actions";

// ISR: serve the cached page, refresh in the background after two minutes.
export const revalidate = 120;

/** Pre-render the first page of the catalogue at build time. */
export async function generateStaticParams() {
    try {
        const { products } = await getProducts(1, 24);
        return products.map((product) => ({ slug: product.slug }));
    } catch {
        // API unreachable during the build: fall back to rendering on demand.
        return [];
    }
}

const getProduct = cache(async (slug: string) => getProductBySlug(slug));

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const product = await getProduct(params.slug);

    if (!product) {
        return {
            title: "Product not found",
            robots: { index: false, follow: true },
        };
    }

    const price = discountedPrice(product);
    const title = `${product.name} — ${formatPrice(price)}`;
    const description = truncate(
        product.description ||
            `Buy ${product.name} at ${formatPrice(price)} from ${
                product.shop?.name ?? site.name
            } with cash on delivery across Bangladesh.`,
        155
    );
    const url = `${site.url}/product/${product.slug}`;

    return {
        title,
        description,
        alternates: { canonical: `/product/${product.slug}` },
        openGraph: {
            type: "website",
            url,
            title,
            description,
            images: [
                {
                    url: product.thumbnail,
                    width: 1200,
                    height: 1200,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [product.thumbnail],
        },
        other: {
            "product:price:amount": String(price),
            "product:price:currency": site.currency,
            "product:availability":
                product.inventory > 0 ? "in stock" : "out of stock",
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const price = discountedPrice(product);
    const saved = savingsPercent(product);
    const inStock = (product.inventory ?? 0) > 0;
    const rating = Number(product.rating ?? 0);
    const reviewCount = product.reviews?.length ?? 0;
    const galleryImages = [product.thumbnail, ...(product.images ?? []).map((image) => image.url)];
    const url = `${site.url}/product/${product.slug}`;

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: galleryImages.slice(0, 4),
        description: product.description,
        sku: product.id,
        brand: { "@type": "Brand", name: product.brand?.name ?? site.name },
        category: product.category?.name,
        ...(reviewCount > 0 && rating > 0
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: rating.toFixed(1),
                      reviewCount,
                  },
              }
            : {}),
        offers: {
            "@type": "Offer",
            url,
            priceCurrency: site.currency,
            price: price,
            itemCondition: "https://schema.org/NewCondition",
            availability: inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            seller: {
                "@type": "Organization",
                name: product.shop?.name ?? site.name,
            },
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            {
                "@type": "ListItem",
                position: 2,
                name: "Products",
                item: `${site.url}/products`,
            },
            ...(product.category
                ? [
                      {
                          "@type": "ListItem",
                          position: 3,
                          name: product.category.name,
                          item: `${site.url}/category/${product.category.slug}`,
                      },
                  ]
                : []),
            {
                "@type": "ListItem",
                position: product.category ? 4 : 3,
                name: product.name,
                item: url,
            },
        ],
    };

    return (
        <article className="section">
            <div className="container-page">
                <nav aria-label="Breadcrumb" className="mb-6">
                    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                        <li>
                            <Link href="/" className="hover:text-foreground">
                                Home
                            </Link>
                        </li>
                        <li aria-hidden>/</li>
                        <li>
                            <Link href="/products" className="hover:text-foreground">
                                Products
                            </Link>
                        </li>
                        {product.category && (
                            <>
                                <li aria-hidden>/</li>
                                <li>
                                    <Link
                                        href={`/category/${product.category.slug}`}
                                        className="hover:text-foreground"
                                    >
                                        {product.category.name}
                                    </Link>
                                </li>
                            </>
                        )}
                        <li aria-hidden>/</li>
                        <li className="max-w-[22ch] truncate text-foreground sm:max-w-none">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-6">
                        <ProductGallery images={galleryImages} alt={product.name} />
                    </div>

                    <div className="lg:col-span-6">
                        <div className="lg:sticky lg:top-24">
                            <div className="flex flex-wrap items-center gap-2">
                                {product.brand?.name && (
                                    <span className="badge-muted">{product.brand.name}</span>
                                )}
                                {saved > 0 && (
                                    <span className="badge-discount">Save {saved}%</span>
                                )}
                                <span
                                    className={
                                        inStock
                                            ? "text-xs font-medium text-success"
                                            : "text-xs font-medium text-destructive"
                                    }
                                >
                                    {inStock
                                        ? `In stock${product.inventory <= 10 ? ` — only ${product.inventory} left` : ""}`
                                        : "Out of stock"}
                                </span>
                            </div>

                            <h1 className="mt-3 text-2xl leading-snug tracking-tight sm:text-3xl">
                                {product.name}
                            </h1>

                            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                                <StarRating rating={rating} />
                                <span className="tabular-nums">{rating.toFixed(1)}</span>
                                <span aria-hidden>·</span>
                                <span>
                                    {reviewCount > 0
                                        ? `${reviewCount} review${reviewCount > 1 ? "s" : ""}`
                                        : "No reviews yet"}
                                </span>
                            </div>

                            <div className="mt-5 flex flex-wrap items-end gap-3">
                                <span className="price text-3xl">{formatPrice(price)}</span>
                                {saved > 0 && (
                                    <span className="price-strike text-base">
                                        {formatPrice(product.price)}
                                    </span>
                                )}
                            </div>

                            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                {product.description}
                            </p>

                            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                {[
                                    {
                                        icon: Truck,
                                        title: "Delivery",
                                        body: "24–48h inside Dhaka",
                                    },
                                    {
                                        icon: RotateCcw,
                                        title: "Returns",
                                        body: "7 days, unused",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Payment",
                                        body: "COD or online",
                                    },
                                ].map(({ icon: Icon, title, body }) => (
                                    <div
                                        key={title}
                                        className="flex items-start gap-2.5 rounded-lg border p-3"
                                    >
                                        <Icon
                                            className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                                            aria-hidden
                                        />
                                        <div>
                                            <p className="text-xs font-semibold">{title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {body}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <ProductActions product={product} />

                            {product.shop && (
                                <div className="mt-6 flex items-center justify-between rounded-xl border p-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Sold by
                                        </p>
                                        <p className="mt-0.5 font-medium">
                                            {product.shop.name}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/shop/${product.shop.id}`}
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        Visit shop
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ProductDetailsFooter product={product} />
                <RelatedProducts categoryId={product.categoryId} />
            </div>

            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([productSchema, breadcrumbSchema]),
                }}
            />
        </article>
    );
}