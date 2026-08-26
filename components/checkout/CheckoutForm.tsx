"use client"

import { useState } from "react"
import { CreditCard, Gift } from "lucide-react"

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

const paymentMethods = [
    { id: "apple_pay", label: "Apple Pay" },
    { id: "revolut_pay", label: "Revolut Pay" },
    { id: "klarna_now", label: "Klarna Pay Now", fee: "+0,87 €" },
    { id: "klarna_later", label: "Klarna Pay Later", fee: "+0,92 €" },
    { id: "klarna_over_time", label: "Klarna Pay Over Time", fee: "+0,93 €" },
    { id: "card", label: "Card" },
    { id: "paysafecard", label: "paysafecard", fee: "+3,57 €" },
    { id: "google_pay", label: "Google Pay" },
    { id: "paypal", label: "Paypal", fee: "+0,93 €" },
] as const

function PaymentBadge({ id }: { id: string }) {
    switch (id) {
        case "apple_pay":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-lg text-white">

                </div>
            )
        case "revolut_pay":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-lg font-bold text-white">
                    R
                </div>
            )
        case "klarna_now":
        case "klarna_later":
        case "klarna_over_time":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-300 text-lg font-black text-black">
                    K
                </div>
            )
        case "card":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white">
                    <CreditCard className="h-5 w-5" />
                </div>
            )
        case "paysafecard":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
                    ⟫
                </div>
            )
        case "google_pay":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-zinc-900">
                    G Pay
                </div>
            )
        case "paypal":
            return (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-bold text-blue-700">
                    P
                </div>
            )
        default:
            return null
    }
}

export function CheckoutForm({ items, finalPrice }: CheckoutFormProps) {
    const [selectedMethod, setSelectedMethod] = useState<string>(
        paymentMethods[0].id
    )

    const total = (finalPrice / 100).toFixed(2).replace(".", ",")

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

                <div>
                    <h2 className="mb-3 text-lg font-semibold">
                        Payment methods
                    </h2>
                    <div className="space-y-2">
                        {paymentMethods.map((method) => {
                            const isSelected = method.id === selectedMethod
                            return (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                                        isSelected
                                            ? "border-green-400 bg-zinc-800"
                                            : "border-transparent bg-zinc-800/60 hover:bg-zinc-800"
                                    }`}
                                >
                                    <PaymentBadge id={method.id} />
                                    <span className="text-sm font-medium">
                                        {method.label}
                                    </span>
                                    {"fee" in method && (
                                        <span className="text-xs text-zinc-400">
                                            ({method.fee})
                                        </span>
                                    )}
                                </button>
                            )
                        })}
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

                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-700 py-3 font-semibold text-white transition hover:opacity-90">
                        {selectedMethod === "apple_pay" && ""}
                        {selectedMethod === "google_pay" && "G "}
                        Bezahlen
                    </button>
                </div>
            </aside>
        </div>
    )
}