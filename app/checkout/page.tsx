import { getCartItems } from "@/lib/db/cart"
import { CheckoutForm } from "@/components/checkout/CheckoutForm"

export default async function CheckoutPage() {
    const items = await getCartItems()

    const finalPrice = items.reduce(
        (total, item) => total + item.product.price_cents * item.quantity,
        0
    )

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <CheckoutForm items={items} finalPrice={finalPrice} />
            </div>
        </div>
    )
}