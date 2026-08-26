import { getProductsByPlatformSlug } from "@/lib/db/products"
import {ProductCard} from "@/components/shop/ProductCard"


export default async function Playstation() {

    const products = await getProductsByPlatformSlug("playstation")

    return (
        <>
            <div className="flex justify-center items-center pt-15 flex-col">
                <h1 className="text-4xl font-bold">PlayStation</h1>

                <p className="w-125 pt-5 text-center">Mit unseren günstigen PlayStation-Spielen kannst du die beliebtesten Titel für Sony-Konsolen genießen. Alle unsere besten Deals, Angebote und Promotionen für Veröffentlichungen im Jahr 2026 sind zu den niedrigsten Preisen erhältlich! Spielereihen wie God of War, Horizon, Last of Us und Final Fantasy können in digitaler Form heruntergeladen werden. </p>
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