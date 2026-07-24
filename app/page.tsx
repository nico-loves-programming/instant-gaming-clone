import { getProducts } from "@/lib/db/products"
import { ProductCatalog } from "@/components/shop/ProductCatalog"
import { getCategories } from "@/lib/db/categories"
import { Hero } from "@/components/layout/Hero"
import { TrendingGames } from "@/components/trending/TrendingGames"
import {TrustBar} from "@/components/trustbar/TrustBar";
import {PreOrderGames} from "@/components/preorder/PreOrderGames";
import {RecommendGames} from "@/components/recommend/RecommendGames";
import {LastWatchedGames} from "@/components/lastwatched/LastWatchedGames";
import {Testimonials} from "@/components/testimonials/Testimonials";
import {Bestseller} from "@/components/bestseller/Bestseller";
import {getCategoriesWithImage} from "@/lib/db/categories";
import {CategoryGrid} from "@/components/categorygrid/CategoryGrid";
import {FAQ} from "@/components/faq/FAQ";
import {Navbar} from "@/components/layout/Navbar";
import {Footer} from "@/components/footer/Footer";

export default async function Home() {
    const products = await getProducts()
    const categories = await getCategories()
    const categoriesWithImage = await getCategoriesWithImage(categories, products)

    return (
        <>
            <Navbar />
            <Hero />
            <TrendingGames products={products.slice(0, 9)} />
            <TrustBar></TrustBar>
            <PreOrderGames products={products.slice(10,16)} />
            <RecommendGames products={products.slice(17,23)} />
            <LastWatchedGames products={products.slice(24,27)} />
            <Testimonials></Testimonials>
            <Bestseller products={products.slice(28,37)} />
            <CategoryGrid categories={categoriesWithImage} />
            <FAQ></FAQ>
            <Footer />
        </>
    )
}