import Link from "next/link"
import {ProductCard} from "@/components/shop/ProductCard";
import type { Product } from "@/types/product"
import { ChevronRight } from "lucide-react";
import {getBestSellerProductsWithAmount} from "@/lib/db/products";

interface BestsellerProps {
    products: Product[]
}

export async function Bestseller({ products }: BestsellerProps) {
    
    const bestsellerProducts = await getBestSellerProductsWithAmount(9)
    
    return (
        <div className="px-12 py-10">
            <Link href="/bestseller" className="group flex items-center gap-2 w-fit mb-6">
                <h2 className="text-white text-2xl font-bold">Bestseller</h2>
                <ChevronRight className="text-gray-400 group-hover:text-white transition-colors" />
            </Link>

            <div className="grid grid-cols-3 gap-6">
                {bestsellerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}