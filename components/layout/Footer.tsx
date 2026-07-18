export function Footer() {
    return (
        <footer className="border-t mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    © 2026 Instant Gaming Clone
                </p>

                <div className="flex gap-6 text-sm">
                    <a href="/legalnotice">Impressum</a>
                    <a href="/privacy">Datenschutz</a>
                    <a href="/contact">Kontakt</a>
                </div>
            </div>
        </footer>
    )
}