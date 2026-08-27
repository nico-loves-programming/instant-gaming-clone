"use client"

import { useTransition } from "react"
import { Gift } from "lucide-react"
import { createCheckoutSession } from "@/actions/checkout"

interface CartItem {
    id: string
    quantity: number
    product: {
        id: string
        name: string
        price_cents: number
    }
}

interface CheckoutFormProps {
    items: CartItem[]
    finalPrice: number
}

export function CheckoutForm({ items, finalPrice }: CheckoutFormProps) {
    const [isPending, startTransition] = useTransition()

    const total = (finalPrice / 100).toFixed(2).replace(".", ",")

    function handleCheckout() {
        startTransition(async () => {
            await createCheckoutSession()
        })
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
                <div>
                    <h2 className="mb-3 text-lg font-semibold">
                        Billing address
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Vor- und Nachname"
                            className="col-span-1 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm placeholder:text-zinc-500"
                        />
                        <input
                            placeholder="Adresse"
                            className="col-span-1 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm placeholder:text-zinc-500"
                        />
                        <select
                            defaultValue="Deutschland"
                            className="col-span-2 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-sm text-white"
                        >
                            <option>Deutschland</option>
                            <option>Österreich</option>
                            <option>Schweiz</option>
                        </select>
                    </div>
                </div>
            </div>

            <aside className="h-fit space-y-4 lg:sticky lg:top-6">
                <div className="rounded-xl bg-zinc-900 p-6">
                    <h2 className="mb-4 text-lg font-semibold">Summary</h2>
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-start justify-between border-b border-zinc-800 pb-3"
                            >
                                <div>
                                    <p className="text-sm font-medium ">
                                        {item.product.name}
                                        {item.quantity > 1
                                            ? ` x${item.quantity}`
                                            : ""}
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        Steam
                                    </p>
                                </div>
                                <span className="text-sm text-zinc-300">
                                    {(
                                        (item.product.price_cents *
                                            item.quantity) /
                                        100
                                    )
                                        .toFixed(2)
                                        .replace(".", ",")}{" "}
                                    €
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-start gap-2 text-xs text-zinc-500">
                        <Gift className="h-4 w-4 shrink-0" />
                        <span>
                            You will also be able to print it as a gift card
                            after purchase
                        </span>
                    </div>
                </div>

                <div className="rounded-xl bg-zinc-900 p-6">
                    <div className="flex justify-between text-sm text-zinc-400">
                        <span>VAT (0%)</span>
                        <span>0 €</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-zinc-800 pt-3 text-lg font-bold">
                        <span>Total</span>
                        <span>{total} €</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={isPending}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-700 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        {isPending ? "Weiterleiten..." : "Bezahlen"}
                    </button>
                </div>
            </aside>
        </div>
    )
}