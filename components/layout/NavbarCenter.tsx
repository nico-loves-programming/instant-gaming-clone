"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import pc_logo from "../../public/images/platforms/pc_logo.png"
import playstation_logo from "../../public/images/platforms/playstation_logo.png"
import xbox_logo from "../../public/images/platforms/xbox_logo.png"
import nintendo_logo from "../../public/images/platforms/nintendo_logo.png"
import lens_logo from "../../public/images/navbar/lens.png"

import type {Product} from "@/types/product";


export function NavbarCenter() {

    const [searchOpen, setSearchOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState<Product[]>([])
    
    async function handleSearch(value: string) {
        setSearch(value)

        if (value.length < 2) {
            setProducts([])
            return
        }

        const res = await fetch(`/api/search?q=${value}`)
        const data = await res.json()

        setProducts(data)
    }
    
    function closeSearch() {
        setSearchOpen(false)
        setSearch("")
        setProducts([])
    }
    
    return (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <AnimatePresence mode="wait">
                {!searchOpen ? (
                    <motion.div
                        key="categories"
                        initial={{
                            opacity: 0,
                            y: -10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -10
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        className="flex gap-6 items-center pt-2">

                        <Link
                            href="/platform/pc"
                            className="flex items-center gap-2 text-zinc-300 hover:text-white transition font-bold text-2xl border border-transparent hover:border-zinc-700 rounded-lg px-3 py-2"
                        >
                            <Image
                                src={pc_logo}
                                alt="PC Logo"
                                width={30}
                                height={30}
                            />
                            PC
                        </Link>
                        
                        <Link
                            href="/platform/playstation"
                            className="flex items-center gap-2 text-zinc-300 hover:text-white transition font-bold text-2xl border border-transparent hover:border-zinc-700 rounded-lg px-3 py-2"
                        >
                            <Image
                                src={playstation_logo}
                                alt="Playstation Logo"
                                width={30}
                                height={30}
                            />
                            Playstation
                        </Link>

                        <Link
                            href="/platform/xbox"
                            className="flex items-center gap-2 text-zinc-300 hover:text-white transition font-bold text-2xl border border-transparent hover:border-zinc-700 rounded-lg px-3 py-2"
                        >
                            <Image
                                src={xbox_logo}
                                alt="Xbox Logo"
                                width={30}
                                height={30}
                            />
                            Xbox
                        </Link>
                        
                        <Link
                            href="/platform/nintendo"
                            className="flex items-center gap-2 text-zinc-300 hover:text-white transition font-bold text-2xl border border-transparent hover:border-zinc-700 rounded-lg px-3 py-2"
                        >
                            <Image
                                src={nintendo_logo}
                                alt="Nintendo Logo"
                                width={30}
                                height={30}
                            />
                            Nintendo
                        </Link>
                        
                        <motion.button
                            onClick={() => setSearchOpen(true)}
                            whileHover={{
                                scale: 1.15
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="bg-gradient-to-br from-green-400 to-green-700 rounded-full p-2.5 flex items-center justify-center"
                        >
                            <Image
                                src={lens_logo}
                                alt="Search"
                                width={30}
                                height={30}
                            />
                        </motion.button>
                    </motion.div>

                ) : (

                    <motion.div
                        key="search"
                        initial={{
                            opacity: 0,
                            width: 0
                        }}
                        animate={{
                            opacity: 1,
                            width: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            width: 0
                        }}
                        transition={{
                            duration: 0.3
                        }}
                        className="relative flex items-center gap-3 pt-2">
                        
                        <div className="relative">
                            <motion.input
                                autoFocus
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                initial={{
                                    scaleX: 0
                                }}
                                animate={{
                                    scaleX: 1
                                }}
                                transition={{
                                    duration: 0.3
                                }}
                                type="text"
                                placeholder="Nach Spielen suchen..."
                                className="w-[650px] bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 outline-none origin-right"
                            />
                            
                            {products.length > 0 && (
                                <div className="absolute top-full left-0 mt-2 w-[650px] bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden z-50">
                                    {products.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/productdetails/${product.id}`}
                                            onClick={closeSearch}
                                            className="flex items-center gap-4 p-3 hover:bg-zinc-800 transition">
                                            <Image
                                                src={product.image_url ?? "/images/default-game.jpg"}
                                                alt={product.name}
                                                width={90}
                                                height={45}
                                                className="rounded object-cover"
                                            />
                                            
                                            <div>
                                                <p className="text-white font-semibold">
                                                    {product.name}
                                                </p>

                                                <p className="text-zinc-400 text-sm">
                                                    {(product.price_cents / 100).toFixed(2).replace(".", ",")} €
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <motion.button
                            onClick={closeSearch}
                            initial={{
                                opacity: 0,
                                rotate: -90
                            }}
                            animate={{
                                opacity: 1,
                                rotate: 0
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="text-zinc-400 hover:text-white text-3xl transition"
                        >
                            ×
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}