import {createClient} from "@/lib/db/server";

export default async function Home() {
    const supabase = await createClient()
    const { data, error } = await supabase.from('product').select('*')
    
    return (
        <div>
            <h1>DB-Test2</h1>
            {error && <pre>Fehler: {JSON.stringify(error, null, 2)}</pre>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}