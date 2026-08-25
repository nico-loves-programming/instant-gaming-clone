import Link from "next/link"
import {ProductCard} from "@/components/shop/ProductCard";
import type { Product } from "@/types/product"
import { ChevronRight } from "lucide-react";

interface PreOrderGamesProps {
    products: Product[]
}

export function PreOrderGames({ products }: PreOrderGamesProps) {
    return (
        <div className="px-12 py-10">
            <Link href="/preorder" className="group flex items-center gap-2 w-fit mb-6">
                <h2 className="text-white text-2xl font-bold">Vorbestellen</h2>
                <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
            </Link>

            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} showPreorderInfo/>
                ))}
            </div>
        </div>
    )
}