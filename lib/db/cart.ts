import { createClient } from "./server"

export async function getCart() {

    const supabase = await createClient()

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser()
    
    if (!user) {
        return null
    }

    let { data: cart } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id)
        .single()

    if (!cart) {

        const { data } = await supabase
            .from("cart")
            .insert({
                user_id: user.id
            })
            .select()
            .single()
        cart = data
    }

    return cart
}

export async function addToCart(productId:string){

    const supabase = await createClient()

    const cart = await getCart()

    if(!cart){
        throw new Error("Kein Warenkorb")
    }
    
    const {
        data: existing
    } = await supabase
        .from("cart_item")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single()
    
    if(existing){
        await supabase
            .from("cart_item")
            .update({
                quantity: existing.quantity + 1
            })
            .eq("id", existing.id)

    }else{
        await supabase
            .from("cart_item")
            .insert({
                cart_id: cart.id,
                product_id: productId,
                quantity:1
            })
    }
}

export async function removeFromCart(productId: string) {
    const supabase = await createClient()

    const cart = await getCart()

    if (!cart) {
        throw new Error("Kein Warenkorb gefunden")
    }

    const { data: existing, error } = await supabase
        .from("cart_item")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single()

    if (error || !existing) {
        throw new Error("Produkt befindet sich nicht im Warenkorb")
    }

    if (existing.quantity > 1) {
        const { error } = await supabase
            .from("cart_item")
            .update({
                quantity: existing.quantity - 1
            })
            .eq("id", existing.id)

        if (error) {
            throw error
        }
    } else {
        const { error } = await supabase
            .from("cart_item")
            .delete()
            .eq("id", existing.id)

        if (error) {
            throw error
        }
    }
}


export async function getCartItems(){

    const supabase = await createClient()

    const cart = await getCart()

    if(!cart)
        return []

    const {
        data,
        error
    } = await supabase
        .from("cart_item")
        .select(`
            id,
            quantity,
            product(
                *
            )
        `)
        .eq(
            "cart_id",
            cart.id
        )

    if(error)
        throw error
    
    return data
}