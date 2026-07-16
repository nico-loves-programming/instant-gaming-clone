"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/db/client"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const supabase = createClient()
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) {
            setError(error.message)
            return
        }

        setSuccess(true)
    }

    if (success) {
        return (
            <div className="max-w-sm mx-auto mt-20 text-center">
                <p>Registrierung erfolgreich! Bitte E-Mail bestätigen und dann einloggen.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-20 flex flex-col gap-4">
            <h1 className="text-xl font-bold">Registrieren</h1>
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
                minLength={6}
            />
            <button type="submit" className="bg-black text-white rounded px-3 py-2">
                Registrieren
            </button>
        </form>
    )
}