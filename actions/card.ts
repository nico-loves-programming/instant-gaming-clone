"use server"

import {addToCart as add} from "@/lib/db/cart"
import {removeFromCart as remove} from "@/lib/db/cart"
import {revalidatePath} from "next/cache";

export async function addProductToCart(id:string){
    await add(id)
    revalidatePath("/cart")
}

export async function removeProductFromCart(id:string){
    await remove(id)
    revalidatePath("/cart")
}