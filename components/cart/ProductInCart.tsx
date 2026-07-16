"use client"

import { useState, useTransition } from "react"
import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import {removeProductFromCart} from "@/actions/card";

interface ProductInCartProps {
    product: Product
    quantity: number
}

export function ProductInCard({product, quantity}: ProductInCartProps) {
    const [removed, setRemoved] = useState(false)

    async function handleRemove() {
        try {
            await removeProductFromCart(product.id)
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <Card>
            <div className="flex">
                <img
                    src={product.image_url ?? undefined}
                    alt={product.name}
                    className="w-48 h-32 object-cover"
                />

                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                            {product.name}
                        </h3>

                        <p className="text-gray-700 mt-1">
                            {(product.price_cents / 100).toFixed(2).replace(".", ",")} €
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            Menge: {quantity}
                        </p>
                    </div>

                    <button
                        onClick={handleRemove}
                        className="self-start bg-black text-white px-4 py-2 rounded"
                    >
                        Entfernen
                    </button>
                </div>
            </div>
        </Card>
    )
}