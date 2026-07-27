"use server"
import {addRecentlyViewed} from "@/lib/db/recentlyViewed"

export async function trackProductView(productId:string){
    
    await addRecentlyViewed(productId)
}