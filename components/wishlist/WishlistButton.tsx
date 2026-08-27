"use client"

import { useState, useTransition } from "react"
import { Heart } from "lucide-react"
import { toggleWishlistItem } from "@/actions/wishlist"

interface WishlistButtonProps {
    productId: string
    initialIsInWishlist: boolean
}

export function WishlistButton({ productId, initialIsInWishlist }: WishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist)
    const [isPending, startTransition] = useTransition()

    function handleClick() {
        setIsInWishlist((prev) => !prev)

        startTransition(async () => {
            try {
                const result = await toggleWishlistItem(productId)
                setIsInWishlist(result)
            } catch {
                setIsInWishlist((prev) => !prev)
            }
        })
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className={`mt-1 flex h-14 w-18 items-center justify-center rounded-lg border-2 transition disabled:opacity-50 ${
                isInWishlist
                    ? "border-green-400 bg-green-500/20 text-green-400"
                    : "border-green-400 text-green-400 hover:bg-green-500/10"
            }`}
        >
            <Heart size={22} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
    )
}