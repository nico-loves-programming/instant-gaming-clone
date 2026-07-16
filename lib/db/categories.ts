import {Category} from "@/types/category";
import {createClient} from "@/lib/db/server";

export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('category')
        .select('*')
    
    if (error) {
        throw new Error(`Fehler beim Laden der Kategorien: ${error.message}`)
    }
    
    return data
}