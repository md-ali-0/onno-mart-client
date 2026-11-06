import BrowseByCategory from "@/components/home/browse-by-category";
import FlashSale from "@/components/home/flash-sale";
import HeroBanner from "@/components/home/hero-banner";
import NewsletterForm from "@/components/home/news-letter-banner";
import PopularBrands from "@/components/home/popular-brands";
import ProductListing from "@/components/home/product-listing";
import RecentProducts from "@/components/home/recent-product";

// Prerendered at build time and refreshed every minute in the background.
export const revalidate = 60;

export default function Home() {
    return (
        <>
            <HeroBanner />
            <BrowseByCategory />
            <FlashSale />
            <ProductListing />
            <PopularBrands />
            <RecentProducts />
            <NewsletterForm />
        </>
    );
}