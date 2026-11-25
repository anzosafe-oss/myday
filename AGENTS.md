# Reguli de lucru pentru MyDay

## Priorități și context

- Prioritizează calitatea, stabilitatea și experiența utilizatorului înaintea economiei de tokeni. Păstrează funcționalitățile existente care nu fac obiectul cererii.
- Citește `PROJECT.md` și începe analiza în repository-ul MyDay. Consultă alte repository-uri sau proiecte Supabase când implementarea ori verificarea o cere.
- Păstrează coerența vizuală și funcțională în ecosistemul MyApps și respectă convențiile deja stabilite. Când utilizatorul indică o altă aplicație ca referință, consultă implementarea ei reală și reutilizează soluția validată, adaptând-o la MyDay.
- Refolosește constatările confirmate și încă valabile. Evită investigațiile redundante și efectuează verificările necesare pentru o implementare stabilă.

## Date și întreținere

- Folosește date demonstrative exclusiv în preview și în mediile de testare. La prima publicare, aplicația live trebuie să pornească fără date demonstrative.
- La actualizările ulterioare, păstrează integral datele reale ale utilizatorilor. Protejează datele și secretele în toate mediile.
- Elimină fișierele devenite inutile numai după verificarea dependențelor, referințelor și procesului de publicare.
- Actualizează punctual `PROJECT.md` când se schimbă contextul tehnic esențial. Include `AGENTS.md` și `PROJECT.md` la primul commit al unui repository nou. Pentru o aplicație existentă fără `PROJECT.md`, creează-l la prima intervenție solicitată.

## Verificare și publicare

- Testează fluxurile modificate și funcțiile existente pe care le pot afecta. Verifică compatibilitatea cu iOS, Android și desktop.
- Pregătește schimbările pe o ramură separată dacă integrarea pe ramura de producție declanșează automat publicarea.
- Actualizează versiunea aplicației la publicare. Publică în producție numai cu acordul explicit al utilizatorului pentru versiunea respectivă și verifică apoi versiunea activă.
