"use server"

import { toggleWishlist as toggle, removeFromWishlist as remove } from "@/lib/db/wishlist"
import { revalidatePath } from "next/cache"

export async function toggleWishlistItem(productId: string) {
    const isNowInWishlist = await toggle(productId)
    revalidatePath("/wishlist")
    return isNowInWishlist
}

export async function removeWishlistItem(productId: string) {
    await remove(productId)
    revalidatePath("/wishlist")
}