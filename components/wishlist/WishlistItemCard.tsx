"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { removeWishlistItem } from "@/actions/wishlist"
import { Product } from "@/types/product"

interface WishlistItemCardProps {
    product: Product
}

export function WishlistItemCard({ product }: WishlistItemCardProps) {
    const [removed, setRemoved] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleRemove() {
        setRemoved(true)
        startTransition(async () => {
            await removeWishlistItem(product.id)
            router.refresh()
        })
    }

    return (
        <div
            className={`flex gap-4 rounded-xl bg-zinc-800/60 p-4 transition-all duration-300 ${
                removed ? "pointer-events-none scale-95 opacity-0" : "opacity-100"
            }`}
        >
            <img
                src={product.image_url ?? undefined}
                alt={product.name}
                className="h-24 w-40 shrink-0 rounded-lg object-cover"
            />

            <div className="flex flex-1 flex-col justify-center gap-1">
                <h3 className="font-medium text-white">{product.name}</h3>
                <span className="text-sm text-zinc-400">
                    {(product.price_cents / 100).toFixed(2).replace(".", ",")} €
                </span>
            </div>

            <button
                onClick={handleRemove}
                disabled={isPending}
                className="flex items-center gap-1 self-center text-xs text-zinc-400 hover:text-white disabled:opacity-30"
            >
                <Trash2 className="h-3.5 w-3.5" />
                Entfernen
            </button>
        </div>
    )
}