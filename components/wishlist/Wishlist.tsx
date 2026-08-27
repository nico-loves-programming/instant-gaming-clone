import { getWishlistItems } from "@/lib/db/wishlist"
import { WishlistItemCard } from "@/components/wishlist/WishlistItemCard"

export async function Wishlist() {
    const items = await getWishlistItems()

    return (
        <div>
            {items.length === 0 ? (
                <p className="text-zinc-400">
                    Deine Wunschliste ist noch leer.
                </p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <WishlistItemCard key={item.id} product={item.product} />
                    ))}
                </div>
            )}
        </div>
    )
}