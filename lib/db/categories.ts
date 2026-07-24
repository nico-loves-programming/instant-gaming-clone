import type { Category } from "@/types/category"
import type { Product } from "@/types/product"
import {createClient} from "@/lib/db/server";

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('category')
        .select('*')
    
    if (error) {
        throw new Error(`Fehler beim Laden der Kategorien: ${error.message}`)
    }
    
    return data
}

export function getCategoriesWithImage(categories: Category[], products: Product[]) {
    return categories.map((category) => {
        const matchingProduct = products.find((p) =>
            p.categories.some((c) => c.id === category.id)
        )
        return {
            ...category,
            image: matchingProduct?.image_url ?? null,
        }
    })
}