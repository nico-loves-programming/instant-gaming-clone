"use server"

import {addToCart as add} from "@/lib/db/cart"
import {removeFromCart as remove} from "@/lib/db/cart"
import {revalidatePath} from "next/cache";
import {increaseQuantity, decreaseQuantity} from "@/lib/db/cart";

export async function addProductToCart(id:string){
    await add(id)
    revalidatePath("/cart")
}

export async function removeProductFromCart(id:string){
    await remove(id)
    revalidatePath("/cart")
}

export async function increaseProductQuantity(productId: string) {
    await increaseQuantity(productId)
}

export async function decreaseProductQuantity(productId: string) {
    await decreaseQuantity(productId)
}

