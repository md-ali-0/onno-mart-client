import Breadcumb from "@/components/shared/breadcumb";
import { getShops } from "@/lib/get-products";
import Image from "next/image";

export default async function SellerPage() {
    const shops = await getShops();

    return (
        <div>
            <Breadcumb />
            <section className="relative py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {shops?.map((shop) => (
                            <div
                                key={shop.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex items-center mb-4">
                                        <Image src={shop.logoUrl as unknown as string} alt={shop.name} width={250}  height={250} className="w-28 mx-auto rounded-full" />
                                    </div>
                                    <h2 className="text-lg font-semibold mb-1">
                                        {shop.name}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-2 h-16 line-clamp-3">
                                        {shop.description}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {new Date(
                                            shop.createdAt
                                        ).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                    <div className="flex space-x-2">
                                        <button className="bg-primary text-white px-4 py-2 rounded">
                                            Follow
                                        </button>
                                        <button className="bg-gray-800 text-white px-4 py-2 rounded">
                                            Visit Store
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
