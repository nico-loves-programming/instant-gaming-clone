// components/profile_card/ProfileCard.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { createClient } from "@/lib/db/client"
import user_logo from "@/public/images/navbar/user.png"

export function ProfileCard() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    async function handleLogout() {
        const supabase = createClient()
        await supabase.auth.signOut()
        setOpen(false)
        router.push("/")
        router.refresh()
    }

    return (
        <div ref={ref} className="relative">
            <button onClick={() => setOpen(!open)}>
                <Image
                    src={user_logo}
                    alt="Profil"
                    width={30}
                    height={30}
                    className="scale-125 hover:scale-150 transition"
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-3 w-48 bg-neutral-800 rounded-lg shadow-lg overflow-hidden"
                    >
                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-3 text-white text-sm hover:bg-neutral-700 transition"
                        >
                            Zum Profil
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-neutral-700 transition"
                        >
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}