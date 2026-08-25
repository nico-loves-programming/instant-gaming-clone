import { getProductById } from "@/lib/db/products"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/cart/AddToCartButton"
import { Navbar } from "@/components/layout/Navbar"
import { TrackProductView } from "@/components/products/TrackProductView"
import Image from "next/image"
import { Heart } from "lucide-react"

interface ProductDetailsProps {
    params: Promise<{ id: string }>
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
        notFound()
    }

    const priceEuro = (product.price_cents / 100).toFixed(2).replace(".", ",")

    return (
        <>
            <Navbar />

            <TrackProductView productId={product.id} />

            <div className="relative w-full h-[800px] bg-neutral-950">
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
                                <button className="w-18 h-14 flex mt-1 items-center justify-center border-2 border-green-400 rounded-lg text-green-400 hover:bg-green-500/10 transition">
                                    <Heart size={22} />
                                </button>
                                <AddToCartButton productId={product.id} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div>
                            <p className="text-3xl font-bold mt-10">Über das Produkt</p>
                            <p className="mt-10 w-96">{product.description}</p>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}