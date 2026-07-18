import Link from "next/link"
import {createClient} from "@/lib/db/server"
import {LogoutButton} from "./LogoutButton"

export async function Navbar() {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center p-4 border-b bg-white">
            <Link href="/" className="font-bold">Instant Gaming Clone</Link>
            <div className="flex gap-6 items-center">

                <div className="flex gap-4">
                    <Link href="/platform/pc">
                        PC
                    </Link>
                    <Link href="/platform/playstation">
                        PlayStation
                    </Link>
                    <Link href="/platform/xbox">
                        Xbox
                    </Link>
                    <Link href="/platform/nintendo">
                        Nintendo
                    </Link>
                </div>

                {user ? (
                    <>
                        <Link href="/cart">Warenkorb</Link>
                        <span className="text-sm">{user.email}</span>
                        <LogoutButton/>
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