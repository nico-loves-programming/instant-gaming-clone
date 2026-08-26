import { getCartItems } from "@/lib/db/cart"
import { ProductInCard } from "@/components/cart/ProductInCart"
import Link from "next/link"
import { ArrowRight, ChevronLeft } from "lucide-react"

export default async function CartPage() {
    const items = await getCartItems()

    const finalPrice = items.reduce(
        (total, item) => total + item.product.price_cents * item.quantity,
        0
    )

    return (
        <>
            <div className="min-h-screen bg-zinc-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <h1 className="mb-6 text-2xl font-bold">Warenkorb</h1>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <ProductInCard
                                    key={item.id}
                                    product={item.product}
                                    quantity={item.quantity}
                                />
                            ))}
                        </div>

                        <aside className="h-fit rounded-xl bg-zinc-900 p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                Zusammenfassung
                            </h2>

                            {/* Originalpreis & Rabatt kommen dazu, sobald die Rabatt-Logik in der DB steht */}

                            <div className="flex items-center justify-between border-t border-zinc-800 py-4 text-lg font-bold">
                                <span>Gesamtbetrag</span>
                                <span>
                                    {(finalPrice / 100)
                                        .toFixed(2)
                                        .replace(".", ",")}{" "}
                                    €
                                </span>
                            </div>

                            <Link
                                href="/checkout"
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-700 py-3 font-semibold transition hover:opacity-90"
                            >
                                Weiter
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <div className="my-4 flex items-center gap-3 text-xs text-zinc-500">
                                <div className="h-px flex-1 bg-zinc-800" />
                                oder
                                <div className="h-px flex-1 bg-zinc-800" />
                            </div>

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-1 text-sm text-zinc-400 hover:text-white"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Weiter einkaufen
                            </Link>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    )
}