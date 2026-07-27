import Image from "next/image";
import logo from "@/public/images/hero.jpg";
import Link from "next/link"
import type {Product} from "@/types/product";

interface HeroProps {
    product: Product | null
}

export function Hero({product}: HeroProps) {
    
    if (!product) return null
    
    return (
        <Link href={`/productdetails/${product.id}`}>
            <div className="relative w-full h-[600px] [clip-path:polygon(0_0,100%_0,100%_92%,0_100%)]">
                <Image
                    src={product.hero_image_url ?? product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                />

                <div className="absolute inset-0 flex flex-col justify-center pl-72 gap-4 bg-gradient-to-r from-black/70 via-black/20 to-transparent">
                    <h1 className="text-white text-4xl font-bold">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-3">
                    <span className="text-white text-3xl">
                        {(product.price_cents / 100).toFixed(2).replace(".",",")} €
                    </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}