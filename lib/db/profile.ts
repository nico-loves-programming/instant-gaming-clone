import {createClient} from "@/lib/db/server";
import type {Profile} from "@/types/profile";

export async function getProfileInfo(): Promise<Profile | null> {
    const supabase = await createClient()

    const {
        data: {user},
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return null
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
    
    if(error) {
        console.error(error)
        return null
    }
    
    return data
}