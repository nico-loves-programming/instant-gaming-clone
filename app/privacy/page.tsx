export default function DatenschutzPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

            <section className="space-y-6">

                <div>
                    <h2 className="text-xl font-semibold">1. Allgemeine Hinweise</h2>
                    <p>
                        Der Schutz deiner persönlichen Daten ist uns wichtig.
                        Diese Datenschutzerklärung informiert darüber, welche
                        Daten bei der Nutzung dieser Website verarbeitet werden.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">2. Registrierung und Benutzerkonto</h2>
                    <p>
                        Bei der Erstellung eines Benutzerkontos werden die von
                        dir angegebenen Daten verarbeitet. Dazu gehören insbesondere
                        deine E-Mail-Adresse und dein Passwort.
                    </p>
                    <p>
                        Die Benutzerverwaltung erfolgt über Supabase.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">3. Bestellungen</h2>
                    <p>
                        Bei Bestellungen werden Informationen gespeichert, die zur
                        Verarbeitung der Bestellung notwendig sind. Dazu gehören
                        Produkte, Mengen und Preise.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">4. Cookies</h2>
                    <p>
                        Diese Website verwendet Cookies, die für die Anmeldung
                        und technische Funktionen notwendig sind.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">5. Deine Rechte</h2>
                    <p>
                        Du hast das Recht auf Auskunft, Berichtigung, Löschung
                        und Einschränkung der Verarbeitung deiner personenbezogenen Daten.
                    </p>
                </div>
            </section>
        </div>
    )
}