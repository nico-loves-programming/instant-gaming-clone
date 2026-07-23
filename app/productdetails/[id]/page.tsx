import { getProductById } from "@/lib/db/products"
import { notFound } from "next/navigation"
import {addProductToCart} from "@/actions/card";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface ProductDetailsProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductDetails({params}: ProductDetailsProps) {
    const {id} = await params
    const product = await getProductById(id)

    if (!product) {
        notFound()
    }
    
    return (
        <div className="max-w-5xl mx-auto p-6">

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.image_url ?? undefined}
                        alt={product.name}
                        className="w-full rounded-lg"
                    />
                </div>
                
                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        {product.name}
                    </h1>
                    <p className="text-2xl font-semibold mb-6">
                        {(product.price_cents / 100)
                            .toFixed(2)
                            .replace(".", ",")} €
                    </p>
                    <p className="text-white leading-relaxed mb-6">
                        {product.description}
                    </p>
                    <AddToCartButton productId={product.id} />
                </div>
            </div>
        </div>
    )
}