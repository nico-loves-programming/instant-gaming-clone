import { NextResponse } from "next/server"
import { createClient } from "@/lib/db/server"

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)

    const q = searchParams.get("q")

    if (!q) {
        return NextResponse.json([])
    }

    const supabase = await createClient()

    const { data, error } = await supabase
        .from("product")
        .select("id,name,image_url,price_cents")
        .ilike("name", `%${q}%`)
        .limit(5)


    if (error) {
        return NextResponse.json([])
    }

    return NextResponse.json(data)
}