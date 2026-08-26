"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { X, Eye, EyeOff } from "lucide-react"
import { FaFacebook, FaDiscord, FaXTwitter } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { createClient } from "@/lib/db/client"
import heroImage from "@/public/images/hero.jpg"
import logo from "@/public/images/navbar/logo.png"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            return
        }

        router.push("/")
        router.refresh()
    }

    return (
        <div className="relative flex min-h-screen">
            <div className="w-full lg:w-1/2 bg-neutral-800 flex flex-col justify-center px-16">
                <h1 className="text-white text-2xl font-semibold mb-6">Login</h1>

                <div className="flex gap-3 mb-6">
                    <button type="button" className="flex-1 bg-blue-600 rounded-lg py-3 flex items-center justify-center text-white">
                        <FaFacebook size={20} />
                    </button>
                    <button type="button" className="flex-1 bg-white rounded-lg py-3 flex items-center justify-center">
                        <FcGoogle size={20} />
                    </button>
                    <button type="button" className="flex-1 bg-black rounded-lg py-3 flex items-center justify-center text-white">
                        <FaXTwitter size={20} />
                    </button>
                    <button type="button" className="flex-1 bg-indigo-500 rounded-lg py-3 flex items-center justify-center text-white">
                        <FaDiscord size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-neutral-700" />
                    <span className="text-neutral-500 text-sm">oder</span>
                    <div className="flex-1 h-px bg-neutral-700" />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                        required
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-400 to-green-700 text-white font-semibold rounded-lg py-3 mt-2"
                    >
                        Anmelden
                    </button>
                </form>

                <div className="flex justify-between mt-4 text-sm">
                    <Link href="/register" className="text-neutral-400 hover:text-white transition">
                        Noch keinen Account?
                    </Link>
                    <Link href="/reset-password" className="text-neutral-400 hover:text-white transition">
                        Passwort vergessen?
                    </Link>
                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 relative">
                <Image src={heroImage} alt="" fill className="object-cover" />
                <Link
                    href="/"
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white hover:bg-black/60 transition"
                >
                    <X size={20} />
                </Link>
            </div>
        </div>
    )
}