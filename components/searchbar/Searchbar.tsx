"use client"

import Image from "next/image"
import { useState } from "react"
import lens_logo from "../../../public/images/lens.png"

export function SearchBar() {
    const [open, setOpen] = useState(false)

    return (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            {!open ? (
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setOpen(true)}
                        className="hover:scale-110 transition">
                        <Image
                            src={lens_logo}
                            alt="Search"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <div className="w-[650px]">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Nach Spielen suchen..."
                            className="
                            w-full
                            bg-zinc-900
                            border
                            border-zinc-700
                            rounded-lg
                            px-4
                            py-3
                            text-white
                            placeholder:text-zinc-500
                            outline-none
                            "/>
                    </div>
                    
                    <button
                        onClick={() => setOpen(false)}
                        className="
                        text-zinc-400
                        hover:text-white
                        text-2xl
                        ">✕
                    </button>
                </div>
            )}
        </div>
    )
}