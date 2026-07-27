import { Navbar } from "@/components/layout/Navbar"
import { getProductsByPlatformSlug } from "@/lib/db/products"
import {ProductCard} from "@/components/shop/ProductCard"


export default async function PC() {

    const products = await getProductsByPlatformSlug("pc")
    
    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center pt-15 flex-col">
                <h1 className="text-4xl font-bold">PC</h1>
                
                <p className="w-125 pt-5 text-center">
                    Entdecke die besten PC-Spiele,
                    DLCs, Vorbestellungen und Bestseller.
                </p>
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