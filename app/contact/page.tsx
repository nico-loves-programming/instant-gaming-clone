export default function KontaktPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">Kontakt</h1>
            <div className="space-y-4">
                <p>
                    Hast du Fragen, Probleme oder Feedback?
                    Schreib uns gerne eine Nachricht.
                </p>

                <div>
                    <h2 className="text-xl font-semibold">Kontaktinformationen</h2>
                    <p>
                        E-Mail:
                        <br/>
                        support@example.de
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Supportzeiten</h2>
                    <p>
                        Montag - Freitag:
                        <br/>
                        09:00 - 17:00 Uhr
                    </p>
                </div>
            </div>
        </div>
    )
}