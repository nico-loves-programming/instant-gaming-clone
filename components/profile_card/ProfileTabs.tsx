"use client"

import { useState, ReactNode } from "react"

interface ProfileTabsProps {
    ordersSlot: ReactNode
    wishlistSlot: ReactNode
}

export function ProfileTabs({ ordersSlot, wishlistSlot }: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState<"orders" | "wishlist">("orders")

    return (
        <div className="mx-auto max-w-5xl px-6 pb-16">
            <div className="mb-6 flex gap-2 border-b border-zinc-800">
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`px-4 py-2 text-sm font-medium transition ${
                        activeTab === "orders"
                            ? "border-b-2 border-white text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    Käufe
                </button>
                <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`px-4 py-2 text-sm font-medium transition ${
                        activeTab === "wishlist"
                            ? "border-b-2 border-white text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    Wunschliste
                </button>
            </div>

            {activeTab === "orders" ? ordersSlot : wishlistSlot}
        </div>
    )
}