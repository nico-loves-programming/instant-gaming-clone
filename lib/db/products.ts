import { createClient } from './server'
import type { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
   const supabase = await createClient();
   
   const { data, error } = await supabase
       .from('product')
       .select('*')
    
   if (error) {
       throw new Error(`Fehler beim Laden der Produkte: ${error.message}`)
   }
   
   return data
}