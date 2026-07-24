// components/layout/TrustBar.tsx
import { CloudDownload, ShieldCheck, MessageCircle, Star } from "lucide-react"

const items = [
    {
        icon: CloudDownload,
        title: "Super schnell",
        subtitle: "Sofortiger digitaler Download",
    },
    {
        icon: ShieldCheck,
        title: "Zuverlässig & sicher",
        subtitle: "Über 20.000 Spiele",
    },
    {
        icon: MessageCircle,
        title: "Kundenservice",
        subtitle: "Menschlicher Support 24/7",
    },
]

export function TrustBar() {
    return (
        <div className="bg-grey px-12 py-8">
            <div className="flex items-center justify-center divide-x divide-neutral-700">
                {items.map((item) => (
                    <div key={item.title} className="flex items-center gap-4 px-10">
                        <item.icon className="text-orange-500" size={32} strokeWidth={1.5} />
                        <div>
                            <p className="text-white font-semibold">{item.title}</p>
                            <p className="text-neutral-400 text-sm">{item.subtitle}</p>
                        </div>
                    </div>
                ))}

                <div className="px-10">
                    <div className="flex items-center gap-2">
                        <Star className="text-green-500 fill-green-500" size={20} />
                        <span className="text-white font-semibold">Trustpilot</span>
                    </div>
                    <div className="flex gap-1 mt-1">
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
                    <p className="text-neutral-400 text-xs mt-1">
                        TrustScore 4.7 <span className="underline">830.196 Bewertungen</span>
                    </p>
                </div>
            </div>
        </div>
    )
}