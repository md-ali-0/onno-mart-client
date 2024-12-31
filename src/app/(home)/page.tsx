import BrowseByCategory from "@/components/home/browse-by-category";
import FlashSale from "@/components/home/flash-sale";
import HeroBanner from "@/components/home/hero-banner";
import NewsletterForm from "@/components/home/news-letter-banner";
import PopularBrands from "@/components/home/popular-brands";
import PopularShops from "@/components/home/popular-shops";
import ProductListing from "@/components/home/product-listing";
import FeaturedBlogs from "@/components/home/recent-blogs";
import RecentProducts from "@/components/home/recent-product";
import { getSession } from "@/lib/session";

export default async function Home() {
    const session = await getSession();

    return (
        <>
            <HeroBanner />
            <BrowseByCategory/>
            <PopularBrands />
            {session.isAuth && <PopularShops />}
            <FlashSale />
            <RecentProducts />
            <ProductListing/>
            <FeaturedBlogs/>
            <NewsletterForm/>
        </>
    );
}
