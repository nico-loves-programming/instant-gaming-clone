import {Product} from "@/types/product";
import {Card} from "@/components/ui/Card";

interface ProductCardProps {
    product: Product
}

export function ProductCard({product}: ProductCardProps) {
    return(
        <Card>
            {product.image_url}
            {product.name}
            {product.price_cents}
        </Card>
    )
}