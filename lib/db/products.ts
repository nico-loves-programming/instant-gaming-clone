import {createClient} from './server'
import type {Product} from '@/types/product'

export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('product')
        .select('*, platform(*), product_category(category(*))')

    if (error) {
        throw new Error(`Fehler beim Laden der Produkte: ${error.message}`)
    }

    return data.map((product) => ({
        ...product,
        categories: product.product_category.map((pc: any) => pc.category),
    }))
}

export async function getRandomProduct(): Promise<Product | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("product")
        .select("*")

    if (error || !data || data.length === 0) {
        console.error(error)
        return null
    }

    const randomProduct = data[Math.floor(Math.random() * data.length)]

    return randomProduct
}

export async function getProductById(id: string) {
    const supabase = await createClient()

    const {data, error} = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

