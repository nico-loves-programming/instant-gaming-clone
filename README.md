# Instant Gaming Clone

Ein E-Commerce-Portfolio-Projekt, das die Grundfunktionen eines digitalen Game-Key-Marktplaces nachbaut: Produktkatalog, Warenkorb, Nutzer-Login und Checkout.

## Über das Projekt

Dieses Projekt entstand, um moderne Full-Stack-Webentwicklung praktisch zu üben und als Portfolio-Stück für Bewerbungen zu dienen. Im Fokus stehen Produktkatalog, Datenbankdesign, Authentifizierung und Zahlungsabwicklung – die Kernbausteine, die in den meisten realen E-Commerce- und SaaS-Projekten vorkommen.

## Tech-Stack

- **Framework:** Next.js 15 (App Router)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS
- **Datenbank & Auth:** Supabase (PostgreSQL)
- **State Management:** Zustand
- **Zahlungen:** Stripe (Test-Modus)

## Features

- [x] Datenbankschema (Produkte, Kategorien, Nutzer, Bestellungen)
- [X] Produktkatalog mit Such- und Filterfunktion
- [ ] Produktdetailseiten
- [x] Nutzer-Authentifizierung
- [x] Warenkorb
- [ ] Checkout mit Stripe
- [ ] Admin-Bereich für Produktverwaltung

## Projektstruktur

```
src/
  app/
    (shop)/         Katalog, Produktdetails, Warenkorb, Checkout
    (admin)/        Admin-Bereich
    api/            API-Routen
  components/
    ui/             Wiederverwendbare Basis-Komponenten
    shop/           Shop-spezifische Komponenten
    layout/         Navigation, Footer
  lib/
    db/             Datenbank-Clients und Queries
    stripe/         Stripe-Integration
  types/            Geteilte TypeScript-Typen
  store/            Zustand-Stores
```

## Setup

1. Repository klonen
   ```
   git clone https://github.com/dein-username/instant-gaming-clone.git
   cd instant-gaming-clone
   ```

2. Abhängigkeiten installieren
   ```
   npm install
   ```

3. Umgebungsvariablen anlegen

   Datei `.env.local` im Projekt-Root erstellen:
   ```
   NEXT_PUBLIC_SUPABASE_URL=deine-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key
   ```

4. Entwicklungsserver starten
   ```
   npm run dev
   ```

   Projekt läuft anschließend unter `http://localhost:3000`.

## Datenbankschema

Das Schema umfasst sechs Tabellen: `product`, `category`, `product_category` (many-to-many-Verknüpfung), `profiles`, `order` und `order_item`. Preise werden durchgehend in Cent als Integer gespeichert, um Rundungsfehler zu vermeiden. Row Level Security ist auf allen Tabellen aktiv.

## Hinweis

Dieses Projekt dient ausschließlich Lern- und Portfoliozwecken. Es werden keine echten Produkte verkauft, keine echten Zahlungen verarbeitet und keine Markenrechte Dritter beansprucht.

## Status

In aktiver Entwicklung.
