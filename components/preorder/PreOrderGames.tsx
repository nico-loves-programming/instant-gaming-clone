import Link from "next/link"
import { PreOrderProductCard } from "@/components/shop/PreOrderProductCard"
import type { Product } from "@/types/product"

interface PreOrderGamesProps {
    products: Product[]
}

export function PreOrderGames({ products }: PreOrderGamesProps) {
    return (
        <div className="px-12 py-10">
            <Link href="/" className="flex items-center gap-2 w-fit mb-6">
                <h2 className="text-white text-2xl font-bold">Vorbestellungen</h2>
                <span className="text-white text-xl">{">"}</span>
            </Link>

            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <PreOrderProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}