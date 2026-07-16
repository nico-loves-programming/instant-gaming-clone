import {getCartItems} from "@/lib/db/cart"

export default async function CartPage(){
    
    const items = await getCartItems()
    
    return(
        <div>
            <h1>Warenkorb</h1>
            {
                items.map(item=>(
                    <div key={item.id}>
                        <p>{item.product.name}</p>
                        <p> Menge: {item.quantity}</p>
                        <p>{(item.product.price_cents / 100).toFixed(2)} €</p>
                    </div>
                ))
            }


        </div>

    )

}