import ProductDetailsFooter from "@/components/product/product-details-footer";
import RelatedProducts from "@/components/product/related-product";
import StarRating from "@/components/product/star-rating";
import { getProductBySlug } from "@/lib/get-products";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "./product-actions";

async function getProduct(slug: string) {
    
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return product;
}

export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = await getProduct(params.slug);

    return (
        <section className="relative md:py-24 py-16">
            <div className="container px-4 lg:px-0 relative">
                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                    <div className="lg:col-span-5">
                        <div className="grid md:grid-cols-12 gap-3">
                            <div className="group md:col-span-12">
                                <div className="duration-500 group-hover:scale-105">
                                    <Image
                                        src={
                                            product.thumbnail as unknown as string
                                        }
                                        className="w-full"
                                        width={500}
                                        height={450}
                                        alt=""
                                    />
                                </div>
                            </div>
                            {product.images.map((image, key) => (
                                <div key={key} className="group md:col-span-6">
                                    <div className="duration-500 group-hover:scale-105">
                                        <Image
                                            src={image.url as unknown as string}
                                            className="w-full"
                                            width={500}
                                            height={450}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="sticky top-20">
                            <h5 className="text-2xl font-semibold">
                                {product?.name}
                            </h5>
                            <div className="flex items-center mt-2 gap-5">
                                <div className="text-slate-400 font-semibold me-1 space-x-2">
                                    <span>
                                        $
                                        {product?.price -
                                            (product?.price *
                                                product?.discount) /
                                                100}
                                    </span>
                                    <del className="text-red-600">
                                        ${product?.price.toFixed(2)}
                                    </del>
                                </div>
                                <div className="flex gap-2">
                                    <StarRating rating={product.rating} />
                                    <span>{product.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="shadow-sm p-4">
                                    <div className="flex items-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-truck h-8 w-8 text-gray-600"
                                        >
                                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                                            <path d="M15 18H9" />
                                            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                                            <circle cx={17} cy={18} r={2} />
                                            <circle cx={7} cy={18} r={2} />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">
                                                FREE SHIPPING &amp; RETURN
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Free shipping on all orders over
                                                $99.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-sm p-4">
                                    <div className="flex items-center gap-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-headphones h-8 w-8 text-gray-600"
                                        >
                                            <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                                        </svg>
                                        <div>
                                            <div className="font-semibold">
                                                ONLINE SUPPORT 24/7
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Lorem ipsum dolor sit amet.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ProductActions product={product} />
                        </div>
                    </div>
                </div>
                <ProductDetailsFooter product={product} />
                <RelatedProducts categoryId={product.categoryId} />
            </div>
        </section>
    );
}
