"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Eye, EyeOff, ChevronLeft } from "lucide-react"
import { FaFacebook, FaDiscord, FaXTwitter } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { createClient } from "@/lib/db/client"
import heroImage from "@/public/images/hero.jpg"
import logo from "@/public/images/navbar/logo.png"
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [country, setCountry] = useState("Deutschland")
    const [acceptedTerms, setAcceptedTerms] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const isValid = email && password.length >= 8 && firstName && lastName && birthDate && acceptedTerms
    
    const router = useRouter()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const supabase = createClient()
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    first_name: firstName,
                    last_name: lastName,
                    birth_date: birthDate,
                    country,
                },
            },
        })

        console.log(data.user?.user_metadata)

        if (error) {
            console.log(error)
            setError(error.message)
            return
        }

        if (!data.user) {
            setError("Kein User wurde erstellt.")
            return
        }

        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: data.user.id,
                email,
                username,
                first_name: firstName,
                last_name: lastName,
                birth_date: birthDate,
                country,
            })

        if (profileError) {
            console.log(profileError)
            setError(profileError.message)
            return
        }

        router.push("/")
    }

    return (
        <div className="relative flex min-h-screen">
            <Link href="/" className="absolute top-6 left-6 z-10">
                <Image
                    src={logo}
                    alt="Logo"
                    width={220}
                    height={90}
                    className="pl-5 pt-2"
                />
            </Link>

            <div className="w-full lg:w-1/2 bg-neutral-800 flex flex-col justify-center px-16 py-12">
                {success ? (
                    <p className="text-white">Registrierung erfolgreich! Bitte bestätige deine E-Mail-Adresse.</p>
                ) : (
                    <>
                        <h1 className="text-white text-2xl font-semibold mb-6">Registrieren</h1>

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

                        <form onSubmit={handleRegister} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Deine E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Dein Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                required
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Passwort (min. 8 Zeichen)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                    minLength={8}
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

                            <input
                                type="text"
                                placeholder="Vorname"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Nachname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                required
                            />

                            <input
                                type="date"
                                placeholder="Geburtsdatum (yyyy/mm/dd)"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 outline-none"
                                required
                            />

                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none"
                            >
                                <option>Deutschland</option>
                                <option>Österreich</option>
                                <option>Schweiz</option>
                            </select>

                            <label className="flex items-center gap-3 text-sm text-neutral-300">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                Ich stimme den <Link href="/terms" className="underline">Terms</Link> und{" "}
                                <Link href="/privacy" className="underline">Privacy policy</Link> zu
                            </label>

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="bg-gradient-to-r from-green-400 to-green-700 text-white font-semibold rounded-lg py-3 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Absenden
                            </button>
                        </form>

                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-1 mt-4 text-sm text-neutral-400 hover:text-white transition"
                        >
                            <ChevronLeft size={16} />
                            Zurück
                        </Link>
                    </>
                )}
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