// import BrowseByCategory from "@/components/home/browse-by-category";
// import FeaturesSection from "@/components/home/features-section";
import FlashSale from "@/components/home/flash-sale";
import HeroBanner from "@/components/home/hero-banner";
import PopularBrands from "@/components/home/popular-brands";
import RecentProducts from "@/components/home/recent-product";

export default function Home() {
    return (
        <>
            <HeroBanner />
            {/* <FeaturesSection/>
            <BrowseByCategory /> */}
            <RecentProducts />
            <FlashSale />
            <PopularBrands />
        </>
    );
}
