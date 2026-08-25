import {getProductsByPlatform} from "@/lib/db/platform"
import {ProductGrid} from "@/components/shop/ProductGrid"

interface PlatformPageProps{
    params: Promise<{slug: string}>
}

export default async function PlatformPage({params}: PlatformPageProps) {

    const {slug} = await params
    const products = await getProductsByPlatform(slug)

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                {slug}
            </h1>
            <ProductGrid products={products}/>
        </div>

    )

}