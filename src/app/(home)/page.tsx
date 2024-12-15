import FlashSale from "@/components/home/flash-sale";
import HeroBanner from "@/components/home/hero-banner";
import PopularBrands from "@/components/home/popular-brands";
import PopularShops from "@/components/home/popular-shops";
import RecentProducts from "@/components/home/recent-product";

export default function Home() {
    return (
        <>
            <HeroBanner />
            <PopularBrands />
            <PopularShops/>
            <RecentProducts />
            <FlashSale />
        </>
    );
}
