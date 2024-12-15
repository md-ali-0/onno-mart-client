import ShopCard from "@/components/sellers/shop-card";
import Breadcumb from "@/components/shared/breadcumb";
import { getShops } from "@/lib/get-products";

export default async function SellerPage() {
    const shops = await getShops();

    return (
        <div>
            <Breadcumb />
            <section className="relative py-16">
                <div className="container relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {shops?.map((shop) => (
                            <ShopCard  key={shop.id} shop={shop} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
