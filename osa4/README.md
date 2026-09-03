# osa 4 blogilista

tämä hakemisto sisältää tehtävät 4.1–4.23.

## komennot

```powershell
npm install
npm run dev
npm test
npm run lint
```

sovellus tarvitsee `MONGODB_URI`- ja `SECRET`-ympäristömuuttujat. tiedoston `.env.example` voi kopioida nimelle `.env`, mutta oikeita tunnuksia tai salaisuuksia ei saa tallentaa gittiin.

testit käyttävät samassa mongodb-klusterissa erillistä `bloglist_test`-tietokantaa. kehityskäytössä tietokannan nimi on `bloglist`.

## rajapinta

- `GET /api/blogs`
- `POST /api/blogs`
- `PUT /api/blogs/:id`
- `DELETE /api/blogs/:id`
- `GET /api/users`
- `POST /api/users`
- `POST /api/login`

blogin lisääminen ja poistaminen vaativat `authorization: bearer <token>` -headerin.
