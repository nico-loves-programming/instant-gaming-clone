import {createClient} from "@/lib/db/server";

export async function getProductsByPlatform(slug: string) {

    const supabase = await createClient()

    const {data, error} = await supabase
        .from("product")
        .select(`
            *,
            platform!inner(*),
            product_category(category(*))
        `)
        .eq(
            "platform.slug",
            slug
        )

    if (error) {
        throw error
    }

    return data.map((product) => ({
        ...product,
        categories:
            product.product_category.map(
                (pc: any) => pc.category
            )

    }))
}