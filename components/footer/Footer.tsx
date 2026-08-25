import Link from "next/link"
import { Star, MessageCircle, Gift, PenSquare, Newspaper, Radio, MapPin, Languages, Coins } from "lucide-react"
import { FaDiscord, FaXTwitter, FaInstagram, FaFacebook, FaYoutube, FaTwitch } from "react-icons/fa6"

const legalLinks = [
    "Allgemeine Geschäftsbedingungen",
    "Datenschutzerklärung",
    "Affiliate Programm",
    "Kontaktiere uns",
]

const iconLinks = [
    { icon: MessageCircle, label: "Unser Discord-Server & Bot" },
    { icon: Gift, label: "Geschenkkarte einlösen" },
    { icon: PenSquare, label: "Blog" },
    { icon: Newspaper, label: "Gaming News für PC und Konsole" },
]

const socials = [
    { icon: FaDiscord, bg: "bg-indigo-500" },
    { icon: FaXTwitter, bg: "bg-black" },
    { icon: FaInstagram, bg: "bg-pink-700" },
    { icon: FaFacebook, bg: "bg-blue-600" },
    { icon: FaYoutube, bg: "bg-red-600" },
    { icon: FaTwitch, bg: "bg-purple-600" },
]

export function Footer() {
    return (
        <div className="bg-black px-12 pt-10 pb-6">
            <div className="grid grid-cols-3 divide-x divide-neutral-800">
                <div className="pr-8">
                    <div className="flex items-center gap-2">
                        <Star className="text-green-500 fill-green-500" size={20} />
                        <span className="text-white font-semibold">Trustpilot</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center">
                                <Star className="text-white fill-white" size={14} />
                            </div>
                        ))}
                        <div className="w-6 h-6 bg-green-500 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-neutral-700" style={{ clipPath: "inset(0 0 0 50%)" }} />
                            <Star className="text-white fill-white relative z-10" size={14} />
                        </div>
                    </div>
                    <p className="text-neutral-400 text-xs mt-2">
                        TrustScore 4.7 <span className="underline">830.196 Bewertungen</span>
                    </p>
                </div>

                <div className="px-8 flex flex-col gap-4">
                    {legalLinks.map((label) => (
                        <Link key={label} href="#" className="text-neutral-300 text-sm hover:text-white transition">
                            {label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-4 mt-2">
                        {iconLinks.map(({ icon: Icon, label }) => (
                            <Link key={label} href="#" className="flex items-center gap-3 text-green-400 text-sm hover:text-green-600 transition">
                                <Icon size={16} />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="pl-8">
                    <h3 className="text-white font-semibold mb-4">Werde Teil unserer Community</h3>
                    <div className="flex gap-3 mb-6">
                        {socials.map(({ icon: Icon, bg }, i) => (
                            <Link
                                key={i}
                                href="#"
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg} hover:opacity-80 transition`}
                            >
                                <Icon size={18} />
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <div className="border border-neutral-700 rounded-lg px-4 py-2 text-white text-xs">
                            <p className="text-neutral-400">Available on the</p>
                            <p className="font-semibold">App Store</p>
                        </div>
                        <div className="border border-neutral-700 rounded-lg px-4 py-2 text-white text-xs">
                            <p className="text-neutral-400">GET IT ON</p>
                            <p className="font-semibold">Google Play</p>
                        </div>
                        <div className="border border-neutral-700 rounded-lg px-4 py-2 text-white text-xs">
                            <p className="font-semibold">Firefox Extension</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-neutral-800 mt-10 pt-6 flex items-center justify-between">
                <div className="text-neutral-400 text-sm">
                    <p>Copyright © 2026 Game Shop - All rights reserved</p>
                    <Link href="#" className="hover:text-white transition">Cookies verwalten</Link>
                </div>

                <div className="flex items-center gap-6 text-neutral-400 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        Deutschland
                    </div>
                    <div className="flex items-center gap-2">
                        <Languages size={16} />
                        Deutsch
                    </div>
                    <div className="flex items-center gap-2">
                        <Coins size={16} />
                        EUR
                    </div>
                </div>
            </div>
        </div>
    )
}