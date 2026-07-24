import Image from "next/image";
import logo from "@/public/images/hero.jpg";
import Link from "next/link"

export function Hero() {
    return (
        <Link href="/">
            <div className="relative w-full h-[600px] [clip-path:polygon(0_0,100%_0,100%_92%,0_100%)]">
                <Image
                    src={logo}
                    alt="Logo"
                    fill
                    className="object-cover object-top"
                />

                <div className="absolute inset-0 flex flex-col justify-center pl-72 gap-4 bg-gradient-to-r from-black/70 via-black/20 to-transparent">
                    <h1 className="text-white text-4xl font-bold">
                        Battlefield 5
                    </h1>

                    <div className="flex items-center gap-3">
                    <span className="text-white text-3xl">
                        39,99 €
                    </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}