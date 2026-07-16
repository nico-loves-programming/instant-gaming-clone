import { getCartItems } from "@/lib/db/cart"

export default async function CheckoutPage() {
    const items = await getCartItems()

    const finalPrice = items.reduce(
        (total, item) => total + item.product.price_cents * item.quantity,
        0
    )

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                Kasse
            </h1>
            <div className="grid grid-cols-[2fr_1fr] gap-8">
                <div className="space-y-6">
                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Lieferadresse
                        </h2>
                        <div className="space-y-3">
                            <input
                                placeholder="Vorname"
                                className="border p-3 rounded w-full"
                            />
                            <input
                                placeholder="Nachname"
                                className="border p-3 rounded w-full"
                            />
                            <input
                                placeholder="Straße"
                                className="border p-3 rounded w-full"
                            />
                            <input
                                placeholder="PLZ"
                                className="border p-3 rounded w-full"
                            />
                            <input
                                placeholder="Stadt"
                                className="border p-3 rounded w-full"
                            />
                        </div>
                    </div>

                    <div className="border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Zahlungsart
                        </h2>
                        <label className="flex gap-2">
                            <input type="radio" name="payment"/>
                            Kreditkarte
                        </label>
                        <label className="flex gap-2 mt-2">
                            <input type="radio" name="payment"/>
                            PayPal
                        </label>
                    </div>
                    
                </div>
                
                <aside className="border rounded-lg p-6 h-fit sticky top-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Deine Bestellung
                    </h2>
                    
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="flex justify-between mb-2"
                        >
                            <span> {item.product.name} x {item.quantity} </span>
                            <span>
                                {(
                                    item.product.price_cents *
                                    item.quantity /
                                    100
                                )
                                    .toFixed(2)
                                    .replace(".", ",")} €
                            </span>
                        </div>
                    ))}
                    
                    <hr className="my-4"/>

                    <p className="font-bold">
                        Gesamt:
                        {" "}
                        {(finalPrice / 100)
                            .toFixed(2)
                            .replace(".", ",")} €
                    </p>
                    
                    <button className="w-full bg-black text-white py-3 rounded mt-6">
                        Kaufen
                    </button>
                </aside>
            </div>
        </div>
    )
}