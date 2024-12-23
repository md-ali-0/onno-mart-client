import FlashSale from "@/components/home/flash-sale";
import HeroBanner from "@/components/home/hero-banner";
import PopularBrands from "@/components/home/popular-brands";
import PopularShops from "@/components/home/popular-shops";
import RecentProducts from "@/components/home/recent-product";
import { getSession } from "@/lib/session";

export default async function Home() {
    const session = await getSession();

    return (
        <>
            <HeroBanner />
            <PopularBrands />
            {session.isAuth && <PopularShops />}
            <FlashSale />
            <RecentProducts />
        </>
    );
}
