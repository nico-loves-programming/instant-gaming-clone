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

export async function getCartItemCount() {
    const supabase = await createClient()

    const cart = await getCart()

    if(!cart){
        throw new Error("Kein Warenkorb")
    }

    const { data, error } = await supabase
        .from("cart_item")
        .select("quantity")
        .eq("cart_id", cart.id)

    if(error) throw error

    return data.reduce((total, item) => total + item.quantity,0)
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

    const { data: existing, error: fetchError } = await supabase
        .from("cart_item")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single()

    if (fetchError || !existing) {
        throw new Error("Produkt befindet sich nicht im Warenkorb")
    }

    const { error } = await supabase
        .from("cart_item")
        .delete()
        .eq("id", existing.id)

    if (error) {
        throw error
    }
}

export async function getCartItems(){

    const supabase = await createClient()

    const cart = await getCart()

    if(!cart) return []

    const { data, error} = await supabase
        .from("cart_item")
        .select(`
            id,
            quantity,
            created_at,
            product(*)
        `)
        .eq("cart_id", cart.id)
        .order("created_at", {ascending: true})

    if(error) throw error

    return data
}

export async function increaseQuantity(productId: string) {

    const supabase = await createClient()

    const cart = await getCart()

    const { data: item, error } = await supabase
        .from("cart_item")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single()

    if (error) throw error

    await supabase
        .from("cart_item")
        .update({
            quantity: item.quantity + 1
        })
        .eq("id", item.id)
}

export async function decreaseQuantity(productId: string) {

    const supabase = await createClient()

    const cart = await getCart()

    const { data: item, error } = await supabase
        .from("cart_item")
        .select("*")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single()

    if (error) throw error

    if (item.quantity <= 1) {

        await supabase
            .from("cart_item")
            .delete()
            .eq("id", item.id)

    } else {

        await supabase
            .from("cart_item")
            .update({
                quantity: item.quantity - 1
            })
            .eq("id", item.id)

    }
}