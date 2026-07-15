import {getProducts} from "@/lib/db/products";
import {ProductGrid} from "@/components/shop/ProductGrid";

export default async function Home() {
    const products = await getProducts()
    
    return (
        <div className="p-6">
            <ProductGrid products={products}/>
        </div>
    )
}