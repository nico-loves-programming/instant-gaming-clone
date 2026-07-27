import Link from "next/link"
import { ProductCard } from "@/components/shop/ProductCard"
import type { Product } from "@/types/product"
import { ChevronRight } from "lucide-react";

interface RecentlyViewedProps {
    products: Product[]
}

export function RecentlyViewed({ products }: RecentlyViewedProps) {
    return (
        <div className="px-12 py-10">
            <h2 className="text-white text-2xl font-bold mb-6">Zuletzt gesehen</h2>

            <div className="grid grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}