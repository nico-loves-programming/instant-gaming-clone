"use client"

import { useState, useTransition } from "react"
import { addProductToCart } from "@/actions/card"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
    productId: string
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition()
    const [added, setAdded] = useState(false)

    function handleAdd() {
        startTransition(async () => {
            try {
                await addProductToCart(productId)
                setAdded(true)

                setTimeout(() => {
                    setAdded(false)
                }, 1500)
            } catch (e) {
                console.error(e)
            }
        })
    }

    return (
        <button
            onClick={handleAdd}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-green-400 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-3 mt-2 transition disabled:opacity-50 mb-5"
        >
            {!isPending && !added && (
                <ShoppingCart size={20}/>
            )}

            {isPending ? "Wird hinzugefügt..." : added ? "Hinzugefügt ✓" : "In den Warenkorb"}
        </button>
    )
}