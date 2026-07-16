"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/db/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    
    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        
        const supabase = createClient()
        const {error} = await supabase.auth.signInWithPassword({email, password})
        
        if(error) {
            setError(error.message);
            return;
        }
        
        router.push("/");
        router.refresh()
    }

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Login</h1>
            {error && <p className="text-red-600">{error}</p>}
            <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <button type="submit" className="bg-black text-white rounded px-3 py-2">
                Einloggen
            </button>
        </form>
    )
}