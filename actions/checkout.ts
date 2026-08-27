"use server"

import { stripe } from "@/lib/stripe"
import { getCartItems } from "@/lib/db/cart"
import { createClient } from "@/lib/db/server"
import { createAdminClient } from "@/lib/db/admin"
import { redirect } from "next/navigation"

export async function createCheckoutSession() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Nicht eingeloggt")
    }

    const items = await getCartItems()

    if (items.length === 0) {
        throw new Error("Warenkorb ist leer")
    }

    const totalCents = items.reduce(
        (total, item) => total + item.product.price_cents * item.quantity,
        0
    )

    const admin = createAdminClient()

    const { data: order, error: orderError } = await admin
        .from("orders")
        .insert({
            user_id: user.id,
            status: "pending",
            total_cents: totalCents,
        })
        .select()
        .single()

    if (orderError || !order) {
        throw new Error("Bestellung konnte nicht erstellt werden")
    }

    const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price_at_purchase_cents: item.product.price_cents,
    }))

    const { error: itemsError } = await admin
        .from("order_item")
        .insert(orderItems)

    if (itemsError) {
        throw new Error("Bestellpositionen konnten nicht erstellt werden")
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.product.name,
                },
                unit_amount: item.product.price_cents,
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        metadata: {
            order_id: order.id,
        },
    })

    await admin
        .from("orders")
        .update({ stripe_session_id: session.id })
        .eq("id", order.id)

    redirect(session.url!)
}