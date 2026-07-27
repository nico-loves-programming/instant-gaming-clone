import { Navbar } from "@/components/layout/Navbar"
import { getProductsByPlatformSlug } from "@/lib/db/products"
import {ProductCard} from "@/components/shop/ProductCard"


export default async function Xbox() {

    const products = await getProductsByPlatformSlug("xbox")
    
    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center pt-15 flex-col">
                <h1 className="text-4xl font-bold">Xbox</h1>
                
                <p className="w-125 pt-5 text-center">Willkommen im Xbox-Angebotsbereich, wo du reduzierte Xbox-Spiele, DLCs, Guthabenkarten und Abonnements findest – von aktuellen Neuerscheinungen bis hin zu Klassikern, die du schon immer spielen wolltest. Auch wenn du auf der Suche nach Prepaid-Karten oder Game-Pass-Abonnements bist, bist du hier genau richtig, denn wir bieten für diese Produkte ebenfalls großartige Angebote an. Unsere Rabatte werden täglich aktualisiert; speichere diese Seite daher am besten als Lesezeichen und schau regelmäßig vorbei, wenn du bei Xbox-Spielen oder Abonnements sparen möchtest.</p>
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