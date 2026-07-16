"use server"

import {addToCart as add} from "@/lib/db/cart"

export async function addProductToCart(id:string){
    await add(id)
}