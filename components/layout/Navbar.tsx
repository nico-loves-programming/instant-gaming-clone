import Link from "next/link"
import { createClient } from "@/lib/db/server"
import { getCartItemCount } from "@/lib/db/cart";
import logo from "../../public/images/navbar/logo.png"
import shopping_cart_logo from "../../public/images/navbar/shopping_cart.png"
import user_logo from "../../public/images/navbar/user.png"
import Image from "next/image"
import { NavbarCenter } from "./NavbarCenter"
import {ProfileCard} from "@/components/profile_card/ProfileCard";

export async function Navbar() {

    const supabase = await createClient()
    const { data:{ user } } = await supabase.auth.getUser()
    const cartItemCount = await getCartItemCount()

    return (
        <nav className="sticky top-0 z-50 flex w-full h-24 items-center justify-between p-4 bg-black ">

            <div className="h-16 w-40 flex items-center">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={220}
                        height={90}
                        className="pl-5 pt-2 scale-125"
                    />
                </Link>
            </div>

            <NavbarCenter />

            <div className="flex gap-9 m-5">
                <Link href="/cart" className="mr-5">
                    <Image
                        src={shopping_cart_logo}
                        alt="Warenkorb"
                        width={30}
                        height={30}
                        className="scale-125 hover:scale-150 transition"
                    />
                    {cartItemCount > 0 && (
                        <span className="absolute top-4 right-26 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-white">
                            {cartItemCount > 9 ? "9+" : cartItemCount}
                        </span>
                    )}
                </Link>

                {user ? (
                    <ProfileCard></ProfileCard>
                ) : (
                    <Link href="/login" className="mr-5">
                        <Image
                            src={user_logo}
                            alt="Profil"
                            width={30}
                            height={30}
                            className="scale-125 hover:scale-150 transition"
                        />
                    </Link>
                )}
            </div>
        </nav>
    )
}