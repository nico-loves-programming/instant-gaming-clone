import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/db/admin"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("stripe-signature")!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error("Webhook-Signatur ungültig", err)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.order_id

        if (orderId) {
            const admin = createAdminClient()

            await admin
                .from("orders")
                .update({ status: "paid" })
                .eq("id", orderId)

            const { data: order } = await admin
                .from("orders")
                .select("user_id")
                .eq("id", orderId)
                .single()

            if (order) {
                const { data: cart } = await admin
                    .from("cart")
                    .select("id")
                    .eq("user_id", order.user_id)
                    .single()

                if (cart) {
                    await admin.from("cart_item").delete().eq("cart_id", cart.id)
                }
            }
        }
    }

    return NextResponse.json({ received: true })
}