import { AddToCartButton } from "@/components/shared/add-to-cart";
import { getProductById } from "@/lib/get-products";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductDetailsPageProps {
    params: {
        id: string;
    };
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const product = await getProductById(params?.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
                    <p className="text-xl mb-4">${product?.price.toFixed(2)}</p>
                    <p className="mb-4">{product?.description}</p>
                    <p className="mb-4">Category: {product?.category?.name}</p>
                    <p className="mb-4">Brand: {product?.brand?.name}</p>
                    <p className="mb-4">Shop: {product?.shop?.name}</p>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}
