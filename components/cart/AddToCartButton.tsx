"use client"

import { useState, useTransition } from "react"
import { addProductToCart } from "@/actions/card"

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
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded px-3 py-2 mt-2 transition disabled:opacity-50"
        >
            {isPending ? "Wird hinzugefügt..." : added ? "Hinzugefügt ✓" : "In den Warenkorb"}
        </button>
    )
}