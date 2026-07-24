"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface FAQItem {
    question: string
    answer: string
}

const faqs: FAQItem[] = [
    {
        question: "Wie funktioniert der Kauf eines Spiels?",
        answer: "Du wählst dein Spiel aus, legst es in den Warenkorb und schließt den Kauf im Checkout ab. Direkt danach ist dein Key in deinem Konto verfügbar.",
    },
    {
        question: "Welche Zahlungsmethoden werden unterstützt?",
        answer: "Aktuell unterstützen wir gängige Kredit- und Debitkarten über unseren Zahlungsanbieter. Weitere Methoden sind in Planung.",
    },
    {
        question: "Bekomme ich sofort Zugriff auf mein Spiel?",
        answer: "Ja, nach erfolgreichem Kauf erscheint dein Produkt sofort in deiner Bestellübersicht, ganz ohne Wartezeit.",
    },
    {
        question: "Kann ich eine Bestellung stornieren?",
        answer: "Solange ein digitaler Code noch nicht eingesehen wurde, ist eine Stornierung innerhalb von 14 Tagen möglich. Danach ist der Kauf verbindlich.",
    },
    {
        question: "Ist dieses Projekt ein echter Shop?",
        answer: "Nein, dies ist ein privates Lern- und Portfolio-Projekt ohne echte Zahlungsabwicklung oder echten Produktverkauf.",
    },
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    function toggle(index: number) {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="bg-neutral-900 px-12 py-10">
            <h2 className="text-white text-2xl font-bold mb-6">FAQs</h2>

            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index

                    return (
                        <div key={faq.question} className="bg-neutral-800 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left"
                            >
                                <span className="text-white">{faq.question}</span>
                                <ChevronRight
                                    className={`text-white transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                                    size={20}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-neutral-400 text-sm">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}