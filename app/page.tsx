import {getProducts} from "@/lib/db/products";
import {ProductGrid} from "@/components/shop/ProductGrid";
import {getCategories} from "@/lib/db/categories";
import {ProductCatalog} from "@/components/shop/ProductCatalog";

export default async function Home() {
    const products = await getProducts()
    const categories = await getCategories();
    
    return (
        <div className="p-6">
            <ProductCatalog products={products} categories={categories} />
        </div>
    )
}