"use client"

import { useState, useTransition } from "react"
import { Product } from "@/types/product"
import { Card } from "@/components/ui/Card"
import {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
} from "@/actions/card"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2 } from "lucide-react"

interface ProductInCartProps {
    product: Product
    quantity: number
}

export function ProductInCard({ product, quantity }: ProductInCartProps) {
    const [removed, setRemoved] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleIncrease() {
        startTransition(async () => {
            await increaseProductQuantity(product.id)
            router.refresh()
        })
    }

    function handleDecrease() {
        startTransition(async () => {
            await decreaseProductQuantity(product.id)
            router.refresh()
        })
    }

    function handleRemove() {
        setRemoved(true)
        startTransition(async () => {
            await removeProductFromCart(product.id)
            router.refresh()
        })
    }

    return (
        <Card
            className={`flex gap-4 bg-zinc-800/60 p-4 transition-all duration-300 ${
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
                {/* Plattform-Badge (Steam-Icon etc.) folgt, sobald das im DB-Schema abgebildet ist */}
            </div>

            <div className="flex flex-col items-end justify-center gap-2">
                <span className="font-semibold text-white">
                    {(product.price_cents / 100).toFixed(2).replace(".", ",")} €
                </span>

                <div className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-1 py-1">
                    <button
                        onClick={handleDecrease}
                        disabled={isPending || quantity <= 1}
                        className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm font-medium text-white">
                        {quantity}
                    </span>
                    <button
                        onClick={handleIncrease}
                        disabled={isPending}
                        className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 hover:bg-zinc-800 disabled:opacity-30"
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                </div>

                <button
                    onClick={handleRemove}
                    disabled={isPending}
                    className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white disabled:opacity-30"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    Entfernen
                </button>
            </div>
        </Card>
    )
}