import { getCartItems } from "@/lib/db/cart"
import { ProductInCard } from "@/components/cart/ProductInCart"

export default async function CartPage() {
    const items = await getCartItems()

    const finalPrice = items.reduce(
        (total, item) => total + (item.product.price_cents * item.quantity),
        0
    )
    
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Warenkorb
            </h1>

            <div className="grid grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-6">
                    {items.map(item => (
                        <ProductInCard
                            key={item.id}
                            product={item.product}
                            quantity={item.quantity}
                        />
                    ))}
                </div>

                <aside className="border rounded-lg p-6 h-fit sticky top-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Bestellübersicht
                    </h2>

                    <p className="pb-2">
                        Preis: {(finalPrice / 100).toFixed(2).replace(".", ",")} €
                    </p>

                    <a
                        href="/checkout"
                        className="block text-center w-full bg-black text-white py-3 rounded"
                    >
                        Zur Kasse
                    </a>
                </aside>

            </div>
        </div>
    )
}