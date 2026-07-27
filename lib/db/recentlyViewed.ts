import { createClient } from "./server";
import {Product} from "@/types/product";


export async function addRecentlyViewed(productId:string) {

    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()
    
    if(!user) return
    
    await supabase
        .from("recently_viewed")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId)
    
    await supabase
        .from("recently_viewed")
        .insert({
            user_id:user.id,
            product_id:productId
        })
    
    const {data} = await supabase
        .from("recently_viewed")
        .select("id")
        .eq("user_id", user.id)
        .order("viewed_at", {
            ascending:false
        })
    
    if(data && data.length > 3){

        const deleteIds = data
            .slice(3)
            .map(item => item.id)
        
        await supabase
            .from("recently_viewed")
            .delete()
            .in("id", deleteIds)
    }
}

export async function getRecentlyViewed(): Promise<Product[]> {

    const supabase = await createClient()

    const {
        data:{
            user
        }
    } = await supabase.auth.getUser()


    if(!user)
        return []


    const {data,error}= await supabase
        .from("recently_viewed")
        .select(`
            product(*)
        `)
        .eq("user_id", user.id)
        .order("viewed_at", {
            ascending:false
        })
        .limit(3)


    if(error || !data)
        return []


    return data.map((item:any)=>item.product)
}

