import Link from "next/link"
import { createClient } from "@/lib/db/server"
import { LogoutButton } from "./LogoutButton"

export async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="flex justify-between items-center p-4 border-b">
            <Link href="/" className="font-bold">Instant Gaming Clone</Link>
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <Link href="/cart">Warenkorb</Link>
                        <span className="text-sm">{user.email}</span>
                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Registrieren</Link>
                    </>
                )}
            </div>
        </nav>
    )
}