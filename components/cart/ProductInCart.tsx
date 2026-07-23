"use client"

import { useState, useTransition } from "react"
import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import {increaseProductQuantity, decreaseProductQuantity, removeProductFromCart} from "@/actions/card";
import {useRouter} from "next/navigation";

interface ProductInCartProps {
    product: Product
    quantity: number
}

export function ProductInCard({product, quantity}: ProductInCartProps) {
    const [removed, setRemoved] = useState(false)
    const router = useRouter();
    
    async function handleIncrease() {
        await increaseProductQuantity(product.id)
        router.refresh()
    }
    
    async function handleDecrease() {
        await decreaseProductQuantity(product.id)
        router.refresh()
    }
    
    async function handleRemove() {
        await removeProductFromCart(product.id)
        router.refresh()
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

                        <p className="text-white mt-1">
                            {(product.price_cents / 100).toFixed(2).replace(".", ",")} €
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                onClick={handleDecrease}
                                className="w-8 h-8 rounded border hover:bg-gray-100"
                            >−</button>
                            <span className="font-semibold w-6 text-center">{quantity}</span>
                            <button
                                onClick={handleIncrease}
                                className="w-8 h-8 rounded border hover:bg-gray-100"
                            >+</button>
                        </div>
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