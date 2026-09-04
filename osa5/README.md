# osa 5 blogilista

tämä hakemisto sisältää tehtävät 5.1–5.20. tehtäviä 5.21–5.23 ei ole merkitty tehdyiksi.

## frontend

```powershell
cd bloglist-frontend
npm install
npm run dev
npm test
npm run lint
npm run build
```

frontend käyttää osan 4 backendia portissa 3003.

## end to end -testit

```powershell
cd bloglist-e2e
npm install
npx playwright install chromium
npm test
```

playwright käynnistää frontendin portissa 5174 ja backendin portissa 3004 automaattisesti. omat portit estävät käsin käynnistettyä kehityspalvelinta häiritsemästä testejä. backend tarvitsee paikallisen `osa4/.env`-tiedoston, jossa ovat avaimet `MONGODB_URI` ja `SECRET`.

testit käyttävät erillistä `bloglist_test`-tietokantaa ja nollaavat sen ennen jokaista selaintestiä.
