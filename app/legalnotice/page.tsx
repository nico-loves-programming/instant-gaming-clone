export default function ImpressumPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">Impressum</h1>

            <section className="space-y-4">

                <div>
                    <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
                    <p>
                        Max Mustermann<br/>
                        Musterstraße 123<br/>
                        12345 Musterstadt<br/>
                        Deutschland
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Kontakt</h2>
                    <p>
                        E-Mail:
                        <br/>
                        kontakt@example.de
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
                    <p>
                        Max Mustermann<br/>
                        Musterstraße 123<br/>
                        12345 Musterstadt
                    </p>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold">Hinweis</h2>
                    <p>
                        Dieses Projekt dient ausschließlich zu Demonstrationszwecken
                        und stellt keinen echten Online-Shop dar.
                    </p>
                </div>
            </section>
        </div>
    )
}