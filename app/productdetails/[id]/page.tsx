import { getProductById } from "@/lib/db/products"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { TrackProductView } from "@/components/products/TrackProductView"
import {isInWishlist} from "@/lib/db/wishlist";
import {WishlistButton} from "@/components/wishlist/WishlistButton";
import Image from "next/image"
import { Heart } from "lucide-react"
import systemRequirements from "@/lib/data/systemRequirements.json"

interface ProductDetailsProps {
    params: Promise<{ id: string }>
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
    const { id } = await params
    const product = await getProductById(id)
    const alreadyInWishlist = await isInWishlist(product.id)

    if (!product) {
        notFound()
    }

    const priceEuro = (product.price_cents / 100).toFixed(2).replace(".", ",")

    return (
        <>
            <TrackProductView productId={product.id} />

            <div className="relative w-full h-[800px] bg-neutral-950 mb-70">
                <div className="absolute inset-0 h-[600px] [clip-path:polygon(0_0,100%_0,100%_100%,0_85%)]">
                    <Image
                        src={product.hero_image_url ?? product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="absolute top-[180px] left-0 right-0 max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 mt-20 self-start">
                            <h1 className="text-3xl font-bold text-center text-white mb-4">
                                {product.name}
                            </h1>

                            <p className="text-white text-3xl text-center font-bold mb-8">
                                {priceEuro} €
                            </p>

                            <div className="flex gap-3">
                                <WishlistButton productId={product.id} initialIsInWishlist={alreadyInWishlist} />
                                <AddToCartButton productId={product.id} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div>
                            <p className="text-3xl font-bold mt-10">Über das Produkt</p>
                            <p className="mt-2 w-96">{product.description}</p>
                        </div>
                        <div className="ms-35">
                            <div>
                                <p className="text-3xl font-bold mt-10 w-150">Minimale Systemanforderungen</p>
                                <div className="mt-2">
                                    <p>Betriebssystem: {systemRequirements.minimum.os}</p>
                                    <p>Prozessor: {systemRequirements.minimum.processor}</p>
                                    <p>Arbeitsspeicher: {systemRequirements.minimum.memory}</p>
                                    <p>Grafikkarte: {systemRequirements.minimum.graphics}</p>
                                    <p>Speicherplatz: {systemRequirements.minimum.storage}</p>
                                    <p>DirectX: {systemRequirements.minimum.directX}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-3xl font-bold mt-10">Empfohlene Systemanforderungen</p>
                                <div className="mt-2">
                                    <p>Betriebssystem: {systemRequirements.recommended.os}</p>
                                    <p>Prozessor: {systemRequirements.recommended.processor}</p>
                                    <p>Arbeitsspeicher: {systemRequirements.recommended.memory}</p>
                                    <p>Grafikkarte: {systemRequirements.recommended.graphics}</p>
                                    <p>Speicherplatz: {systemRequirements.recommended.storage}</p>
                                    <p>DirectX: {systemRequirements.recommended.directX}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}