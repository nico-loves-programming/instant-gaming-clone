import { getProductsByPlatformSlug } from "@/lib/db/products"
import {ProductCard} from "@/components/shop/ProductCard"


export default async function Nintendo() {

    const products = await getProductsByPlatformSlug("nintendo")

    return (
        <>
            <div className="flex justify-center items-center pt-15 flex-col">
                <h1 className="text-4xl font-bold">Nintendo</h1>

                <p className="w-125 pt-5 text-center">Hol dir unsere günstigen Nintendo-Spiele und entdecke Top-Games zum kleinen Preis – darunter Klassiker wie Mario, Zelda und viele mehr, oder die neuesten 2026-Releases für Nintendo. Sichere dir jetzt unsere Rabatte und Aktionsangebote auf Action-, Abenteuer-, Sportspiele und vieles mehr! </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6 mt-12">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </>
    )
}