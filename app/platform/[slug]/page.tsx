import {getProductsByPlatform} from "@/lib/db/platform"
import {ProductGrid} from "@/components/shop/ProductGrid"

export default async function PlatformPage({params}: { params: { slug: string } }) {

    const products =
        await getProductsByPlatform(
            params.slug
        )

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                {params.slug}
            </h1>
            <ProductGrid products={products}/>
        </div>

    )

}