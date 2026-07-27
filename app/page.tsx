import {getPreOrderGamesWithAmount, getProducts, getTrendingProductsWithAmount} from "@/lib/db/products"
import { getCategories } from "@/lib/db/categories"
import { Hero } from "@/components/layout/Hero"
import { TrendingGames } from "@/components/trending/TrendingGames"
import {TrustBar} from "@/components/trustbar/TrustBar";
import {PreOrderGames} from "@/components/preorder/PreOrderGames";
import {RecommendGames} from "@/components/recommend/RecommendGames";
import {RecentlyViewed} from "@/components/recentlyviewed/RecentlyViewedGames";
import {Testimonials} from "@/components/testimonials/Testimonials";
import {Bestseller} from "@/components/bestseller/Bestseller";
import {getCategoriesWithImage} from "@/lib/db/categories";
import {CategoryGrid} from "@/components/categorygrid/CategoryGrid";
import {FAQ} from "@/components/faq/FAQ";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/footer/Footer";
import {getRecentlyViewed} from "@/lib/db/recentlyViewed";

export default async function Home() {
    
    const products = await getProducts()
    const categories = await getCategories()
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    const categoriesWithImage = await getCategoriesWithImage(categories, products)
    const trendingGamesWithAmount = await getTrendingProductsWithAmount(9)
    const preOrderGamesWithAmount = await getPreOrderGamesWithAmount(9)
    const recentlyViewed = await getRecentlyViewed()

    return (
        <>
            <Navbar />
            <Hero product={randomProduct}/>
            <TrendingGames products={trendingGamesWithAmount} />
            <TrustBar></TrustBar>
            <PreOrderGames products={preOrderGamesWithAmount} />
            <RecommendGames products={products.slice(17,23)} />
            <RecentlyViewed products={recentlyViewed} />
            <Testimonials></Testimonials>
            <Bestseller products={products.slice(28,37)} />
            <CategoryGrid categories={categoriesWithImage} />
            <FAQ></FAQ>
            <Footer />
        </>
    )
}