import ProductCard from "@/components/product/product-card";
import SectionHeader from "@/components/shared/section-header";
import ShopFollowButton from "@/components/shop/shop-follow-button";
import { truncate } from "@/lib/format";
import { getProductsByShop } from "@/lib/get-products-by-shop";
import { getShopById, getShops } from "@/lib/get-products";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: { id: string };
    searchParams: { page?: string };
};

export const revalidate = 180;

/** Prerender every known shop so the sitemap URLs resolve to real HTML. */
export async function generateStaticParams() {
    try {
        const { data } = await getShops(1);
        return data.map((shop) => ({ id: shop.id }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const shop = await getShopById(params.id);
    if (!shop) return { title: "Shop not found" };

    const description = truncate(
        shop.description || `Browse products from ${shop.name} on ${site.name}.`,
        155
    );

    return {
        title: shop.name,
        description,
        alternates: { canonical: `/shop/${params.id}` },
        openGraph: {
            title: `${shop.name} | ${site.name}`,
            description,
            url: `/shop/${params.id}`,
            images: shop.logoUrl ? [shop.logoUrl] : undefined,
        },
    };
}

export default async function ShopPage({ params, searchParams }: Props) {
    const page = Number(searchParams.page) || 1;

    const [shop, result] = await Promise.all([
        getShopById(params.id),
        getProductsByShop(page, params.id).catch(() => null),
    ]);

    if (!shop) notFound();

    const products = result?.data ?? [];
    const totalPages = result?.meta?.totalPage ?? 1;
    const productCount = shop.products?.length ?? products.length;
    const followerCount = shop.followers?.length ?? 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Store",
        name: shop.name,
        description: shop.description ?? undefined,
        image: shop.logoUrl ?? undefined,
        url: `${site.url}/shop/${shop.id}`,
    };

    return (
        <div className="container-page py-8 sm:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
            >
                <Link href="/" className="hover:text-foreground">
                    Home
                </Link>
                <span aria-hidden>/</span>
                <Link href="/shops" className="hover:text-foreground">
                    Shops
                </Link>
                <span aria-hidden>/</span>
                <span className="text-foreground">{shop.name}</span>
            </nav>

            <header className="surface-muted flex flex-col gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8">
                {shop.logoUrl ? (
                    <Image
                        src={shop.logoUrl}
                        alt=""
                        width={96}
                        height={96}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                ) : (
                    <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-secondary text-2xl font-semibold text-primary">
                        {shop.name[0]}
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <p className="eyebrow">Verified shop</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {shop.name}
                    </h1>
                    {shop.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                            {shop.description}
                        </p>
                    )}
                    <p className="mt-3 text-xs text-muted-foreground">
                        {productCount} products · {followerCount} followers
                    </p>
                </div>

                <ShopFollowButton shopId={shop.id} />
            </header>

            <section className="section">
                <SectionHeader
                    title="Products"
                    description={`Everything listed by ${shop.name}.`}
                    href="/products"
                    linkLabel="All products"
                />

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed py-16 text-center">
                        <p className="text-sm font-medium">No products yet</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            This shop has not listed anything on this page.
                        </p>
                    </div>
                )}

                {totalPages > 1 && (
                    <nav
                        aria-label="Pagination"
                        className="mt-8 flex items-center justify-center gap-3"
                    >
                        {page > 1 && (
                            <Link
                                href={`/shop/${shop.id}?page=${page - 1}`}
                                className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                            >
                                Previous
                            </Link>
                        )}
                        <span className="text-sm tabular-nums text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>
                        {page < totalPages && (
                            <Link
                                href={`/shop/${shop.id}?page=${page + 1}`}
                                className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                            >
                                Next
                            </Link>
                        )}
                    </nav>
                )}
            </section>
        </div>
    );
}
