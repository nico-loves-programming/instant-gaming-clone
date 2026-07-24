import Link from "next/link"
import { createClient } from "@/lib/db/server"
import { LogoutButton } from "./LogoutButton"
import logo from "../../public/images/logo.png"
import Image from "next/image"

export async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="sticky top-0 z-50 flex h-16 justify-between items-center p-4 bg-zinc-950 text-white">
            <div className="relative h-16 w-40 flex items-center">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={180}
                        height={60}
                        className="object-contain"
                    />
                </Link>
            </div>

            <div className="flex gap-6 items-center">
                <div className="flex gap-4">
                    <Link
                        href="/platform/pc"
                        className="text-zinc-300 hover:text-white transition"
                    >
                        PC
                    </Link>

                    <Link
                        href="/platform/playstation"
                        className="text-zinc-300 hover:text-white transition"
                    >
                        PlayStation
                    </Link>

                    <Link
                        href="/platform/xbox"
                        className="text-zinc-300 hover:text-white transition"
                    >
                        Xbox
                    </Link>

                    <Link
                        href="/platform/nintendo"
                        className="text-zinc-300 hover:text-white transition"
                    >
                        Nintendo
                    </Link>
                </div>

                {user ? (
                    <>
                        <Link
                            href="/cart"
                            className="text-zinc-300 hover:text-white transition"
                        >
                            Warenkorb
                        </Link>

                        <span className="text-sm text-zinc-400">
                            {user.email}
                        </span>

                        <LogoutButton />
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-zinc-300 hover:text-white transition"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="text-zinc-300 hover:text-white transition"
                        >
                            Registrieren
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}