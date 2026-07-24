import { Star } from "lucide-react"

interface Review {
    name: string
    text: string
    time: string
}

const reviews: Review[] = [
    { name: "Roblox - 4000...", text: "Alles bestens! In Sekunden schnelle kommt der Code", time: "vor 8 Stunden" },
    { name: "Roblox Card - 200...", text: "Immer wieder gerne! Schnelle Abwicklung", time: "vor 8 Stunden" },
    { name: "VOIN", text: "Wie immer - alles Perfekt!", time: "vor 13 Stunden" },
    { name: "Clair Obscur:...", text: "Super fast and without any trouble", time: "gestern" },
    { name: "PlayStation Store...", text: "Top", time: "vor 2 Tagen" },
]

function Stars({ count = 5 }: { count?: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={16} className="text-green-400 fill-green-400" />
            ))}
        </div>
    )
}

export function Testimonials() {
    return (
        <div>
            <div className="bg-neutral-800 flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                <Stars />
                <p className="text-neutral-200 max-w-2xl">
                    Game Shop ist eine fantastische Plattform, um deine PC-, PlayStation-,
                    Xbox- und Switch-Spiele günstiger zu kaufen, mit 24/7 sofortiger Lieferung
                    und immer zum besten Preis!
                </p>
                <button className="bg-gradient-to-r from-green-400 to-green-900 text-white font-semibold px-6 py-3 rounded-lg mt-2">
                    1.582.925 Nutzerbewertungen
                </button>
            </div>

            <div className="bg-neutral-900 grid grid-cols-5 gap-6 px-6 py-8">
                {reviews.map((review) => (
                    <div key={review.name} className="bg-neutral-800 rounded-xl p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-700" />
                            <div>
                                <Stars />
                                <p className="text-white text-sm mt-1 truncate max-w-[140px]">{review.name}</p>
                            </div>
                        </div>

                        <p className="text-neutral-300 text-sm">{review.text}</p>

                        <p className="text-neutral-500 text-xs mt-auto">{review.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}