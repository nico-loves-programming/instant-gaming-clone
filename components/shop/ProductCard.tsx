"use client"

import { useState, useTransition } from "react"
import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { addProductToCart } from "@/actions/card";
import { useRouter } from "next/navigation"


interface ProductCardProps {
    product: Product
}

export function ProductCard({product}: ProductCardProps) {
    const [isPending, startTransition] = useTransition()
    const [added, setAdded] = useState(false)
    const router = useRouter()

    function handleAdd() {
        startTransition(async () => {
            try {
                await addProductToCart(product.id)
                setAdded(true)
                setTimeout(() => setAdded(false), 1500)
            } catch (e) {
                console.error(e)
            }
        })
    }

    return(
        <Card>
            <div className="flex justify-between pb-2 text-white">
                {product.name}
                <p>Preis: {(product.price_cents / 100).toFixed(2).replace('.',',')} €</p>
            </div>
            <img
                src={product.image_url ?? undefined}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                onClick={() => router.push(`/productdetails/${product.id}`)}            
            />
            <button
                onClick={handleAdd}
                disabled={isPending}
                className="w-full bg-black text-white rounded px-3 py-2 mt-2 disabled:opacity-50"
            >
                {isPending ? "Wird hinzugefügt..." : added ? "Hinzugefügt ✓" : "In den Warenkorb"}
            </button>
        </Card>
    )
}