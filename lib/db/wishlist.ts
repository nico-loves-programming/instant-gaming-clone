import { createClient } from "./server"

export async function isInWishlist(productId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return false

    const { data } = await supabase
        .from("wishlist_item")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

    return !!data
}

export async function toggleWishlist(productId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Nicht eingeloggt")
    }

    const { data: existing } = await supabase
        .from("wishlist_item")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

    if (existing) {
        const { error } = await supabase
            .from("wishlist_item")
            .delete()
            .eq("id", existing.id)

        if (error) throw error

        return false
    }

    const { error } = await supabase
        .from("wishlist_item")
        .insert({ user_id: user.id, product_id: productId })

    if (error) throw error

    return true
}

export async function removeFromWishlist(productId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Nicht eingeloggt")
    }

    const { error } = await supabase
        .from("wishlist_item")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId)

    if (error) throw error
}

export async function getWishlistItems() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data, error } = await supabase
        .from("wishlist_item")
        .select(`
            id,
            created_at,
            product(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) throw error

    return data
}

export async function getWishlistCount() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return 0

    const { count, error } = await supabase
        .from("wishlist_item")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)

    if (error) throw error

    return count ?? 0
}