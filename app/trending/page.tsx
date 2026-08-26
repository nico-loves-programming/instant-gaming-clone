import {getAllTrendingGames} from "@/lib/db/products";
import Link from "next/link";
import {ProductCard} from "@/components/shop/ProductCard";
import { ChevronRight } from "lucide-react";

export default async function Trending() {

    const allTrendingGames = await getAllTrendingGames()

    return(
        <>
            <div className="px-12 py-10">
                <Link href="/trending" className="flex items-center gap-2 w-fit mb-6">
                    <h2 className="text-white text-2xl font-bold">Spiele im Trend</h2>
                    <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
                </Link>

                <div className="grid grid-cols-3 gap-6">
                    {allTrendingGames.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product} />
                    ))}
                </div>
            </div>
        </>
    )
}