# MyDay

- Aplicație statică pentru notițe, sarcini și calendar. Intrare în `index.html`. GitHub Pages publică din `main`, directorul rădăcină.
- Datele de lucru se salvează local sub cheia `myday.v1`. În Setări, backupul și restaurarea se fac la cerere, cu un cont Supabase existent.
- Proiect Supabase: MySubs. MyDay folosește exclusiv `public.myday_backups`, cu RLS pe proprietar și o cheie publicabilă. Schema este în `myday_backups.sql`.
- Iconul „Varianta 2 – Notițe” este încorporat în antet și livrat ca favicon, Apple Touch Icon și iconuri Android prin `manifest.webmanifest` și `icons/`. Partajarea existentă este demonstrativă.
- Refresh-ul urmează fluxul MyList: indicator la tragere, verificare fără cache a versiunii online și reîncărcare automată pentru o versiune mai nouă. MyDay recitește datele locale și păstrează ecranul și filtrele la actualizare. La publicare, actualizează împreună meta `myday-version` și titlul paginii.
