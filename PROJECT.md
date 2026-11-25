# MyDay

- Aplicație statică pentru notițe, sarcini și calendar. Intrare în `index.html`. GitHub Pages publică din `main`, directorul rădăcină.
- Datele de lucru se salvează local sub cheia `myday.v1`. În Setări, backupul și restaurarea se fac la cerere, cu un cont Supabase existent.
- Proiect Supabase: MySubs. MyDay folosește exclusiv `public.myday_backups`, cu RLS pe proprietar și o cheie publicabilă. Schema este în `myday_backups.sql`.
- Iconul „Varianta 2 – Notițe” este încorporat în HTML. Partajarea existentă este demonstrativă.
