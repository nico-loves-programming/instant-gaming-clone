"use client"

import { useState, useTransition } from "react"
import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { addProductToCart } from "@/actions/card";
import { useRouter } from "next/navigation"
import {getReleaseText} from "@/lib/utils/date";

interface PreOrderProductCardProps {
    product: Product
}

export function PreOrderProductCard({product}: PreOrderProductCardProps) {
    const [isPending, startTransition] = useTransition()
    const [added, setAdded] = useState(false)
    const router = useRouter()

    function handleAdd() {
        startTransition(async () => {
            try {
                await addProductToCart(product.id)
                setAdded(true)
                setTimeout(() => setAdded(false), 1500)
            } catch (e) {
                console.error(e)
            }
        })
    }

    return(
        <Card>
            <div>
                <img
                    src={product.image_url ?? undefined}
                    alt={product.name}
                    className="w-full object-cover transition-transform duration-300 hover:scale-105"
                    onClick={() => router.push(`/productdetails/${product.id}`)}
                />
                <div className="flex justify-between pt-4 text-xl text-white">
                    {product.name}
                    <p>{(product.price_cents / 100).toFixed(2).replace('.',',')} €</p>
                </div>

                <div className="flex flex-row text-sm text-blue-400">
                    <p className="border-1">VORBESTELLUNG</p>
                    <p className="pl-5">{getReleaseText(product.release_date)}</p>
                </div>
            </div>
        </Card>
    )
}