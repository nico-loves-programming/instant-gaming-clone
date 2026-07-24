import { getProducts } from "@/lib/db/products"
import { ProductCatalog } from "@/components/shop/ProductCatalog"
import { getCategories } from "@/lib/db/categories"
import { Hero } from "@/components/layout/Hero"
import { TrendingGames } from "@/components/layout/TrendingGames"
import {TrustBar} from "@/components/trustbar/TrustBar";

export default async function Home() {
    const products = await getProducts()
    const categories = await getCategories()

    return (
        <>
            <Hero />
            <TrendingGames products={products.slice(0, 6)} />
            <TrustBar></TrustBar>
        </>
    )
}