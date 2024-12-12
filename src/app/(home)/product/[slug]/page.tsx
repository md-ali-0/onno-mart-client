import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductBySlug } from "@/lib/get-products";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "./product-actions";

async function getProduct(slug: string) {
    // This is a mock function. In a real app, you'd fetch this data from an API or database
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
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
                        <Image
                            src={product.thumbnail as unknown as string}
                            alt={product.name}
                            className="object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                    <div className="flex gap-4 overflow-auto pb-2">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg border bg-white"
                            >
                                <Image
                                    src={image.url as unknown as string}
                                    alt={`${product.name} thumbnail ${
                                        index + 1
                                    }`}
                                    className="object-cover"
                                    fill
                                    sizes="96px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="mt-4 text-3xl font-bold">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <p className="text-gray-600">{product.description}</p>

                    <div className="space-y-4">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-medium">
                                    AVAILABILITY:
                                </span>
                                <Badge variant="secondary">
                                    {product.inventory}
                                </Badge>
                            </div>
                            {/* <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">SKU:</span>
                <span className="text-gray-600">{product.sku}</span>
              </div> */}
                            <div className="flex items-center justify-between">
                                <span className="font-medium">CATEGORIES:</span>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">
                                        {product?.category.name}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <ProductActions product={product} />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="description" className="mt-12">
                <TabsList>
                    <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
                    <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
                    <TabsTrigger value="size-chart">SIZE CHART</TabsTrigger>
                    <TabsTrigger value="shipping">
                        SHIPPING & DELIVERY
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-4">
                    <div className="space-y-4">
                        <p>{product?.description}</p>
                    </div>
                </TabsContent>
                <TabsContent value="reviews">Reviews content</TabsContent>
                <TabsContent value="size-chart">Size chart content</TabsContent>
                <TabsContent value="shipping">
                    Shipping information content
                </TabsContent>
            </Tabs>
        </div>
    );
}
