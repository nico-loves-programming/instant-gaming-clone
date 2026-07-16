import {Product} from "@/types/product";
import {Card} from "@/components/ui/Card";

interface ProductCardProps {
    product: Product
}

export function ProductCard({product}: ProductCardProps) {
    return(
        <Card>
            <div className="flex justify-between pb-2">
                {product.name}
                <p>Preis: {(product.price_cents / 100).toFixed(2).replace('.',',')} €</p>
            </div>
            <img
                src={product.image_url ?? undefined}
                alt={product.name}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
        </Card>
    )
}