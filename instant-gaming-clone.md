### Tech-Stack
- **Next.js 15** (App Router, nicht Pages Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** – Postgres-DB + Auth + Storage in einem, super schnell startklar, echtes SQL im Hintergrund (kein Vendor-Lock-in-Spielzeug)
- **Prisma** oder **Drizzle ORM** – für typsichere DB-Queries 
- **Zustand** – fürs Warenkorb-State-Management (leichter als Redux, aktuell sehr beliebt)
- **Stripe** (Test-Mode) – für Checkout

### Dein Workflow 
1. **Datenmodell zuerst** – welche Tabellen es gibt und wie sie zusammenhängen.
2. **Backend/API-Layer** – Funktionen, die Daten holen/schreiben, ohne UI drumrum.
3. **Kleinste UI-Bausteine (Atoms)** – Button, Input, Card – isoliert, wiederverwendbar.
4. **Zusammengesetzte Komponenten** – ProductCard, CartItem, aus den Atoms gebaut.
5. **Seiten** – setzen die Komponenten zusammen, holen Daten über die API-Funktionen.
### Ordnerstruktur
![img_1.png](img_1.png)
### Phasen
**Phase 0 – Setup**
- [x]  Next.js-Projekt aufsetzen (`create-next-app`, TypeScript + Tailwind direkt mit aktivieren)
- [x]  Supabase-Projekt anlegen, DB-Connection testen
- [ ]  Git-Repo + erster Commit

**Phase 1 – Datenmodell**
- [ ]  Tabellen designen: `products`, `categories`, `users`, `orders`, `order_items`
- [ ]  Schema in Supabase/Drizzle anlegen
- [ ]  Seed-Daten (Fake-Produkte) reinschreiben, damit du was zum Testen hast

**Phase 2 – Produktkatalog (Read-Only)**
- [ ]  API-Funktion: alle Produkte holen
- [ ]  `ProductCard`-Komponente
- [ ]  `ProductGrid`-Komponente
- [ ]  Startseite baut daraus den Katalog

**Phase 3 – Produktdetail + Suche/Filter**
- [ ]  Dynamische Route `product/[id]`
- [ ]  Suchfeld + Kategorie-Filter (erstmal simpel, Client-seitig)

**Phase 4 – Auth**
- [ ]  Supabase Auth einbinden (Login/Register/Logout)
- [ ]  Geschützte Routen (z.B. Checkout nur eingeloggt)

**Phase 5 – Warenkorb**
- [ ]  Zustand-Store fürs Cart
- [ ]  Add/Remove/Update-Menge
- [ ]  Cart-Seite

**Phase 6 – Checkout**
- [ ]  Stripe Test-Mode einbinden
- [ ]  Bestellung in DB speichern nach erfolgreicher Zahlung

**Phase 7 – Admin (optional, danach)**
- [ ]  Produkte CRUD im Admin-Bereich

### ER-Diagramm
![img_2.png](img_2.png)