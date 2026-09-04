# Osa 3 – omat oppimismuistiinpanottttttt

tässä ovat osan tärkeimmät asiat lyhyesti. mP

## Tehtävä 3.12: MongoDB ja Mongoose

- `process.argv` sisältää komentorivillä ohjelmalle annetut arvot.
- `Person.find({})` palauttaa promisen, jonka tuloksena saadaan kaikki henkilöt.
- `person.save()` palauttaa promisen, joten tallennuksen valmistumista voidaan odottaa.
- tietokantayhteys suljetaan vasta operaation jälkeen, koska muuten kysely voi jäädä kesken.
- salasana säilytetään `.env`-tiedostossa, jotta se ei päädy git-historiaan.

## Tehtävä 3.16: virheenkäsittelymiddlewaree

- express-middleware käsittelee pyynnön matkalla seuraavaan vaiheeseen.
- `next(error)` siirtää virheen expressin virheenkäsittelijälle.
- virheenkäsittelijä sijoitetaan routejen jälkeen, jotta routeista tulevat virheet päätyvät siihen.

## Tehtävä 3.19: validointi ja frontendin virheilmoitus

- mongoose-validointi tapahtuu ennen dokumentin tallentamista tai validoivaa päivitystä.
- backend palauttaa validointivirheestä statuskoodin 400.
- frontend saa viestin axios-virheen kohdasta `error.response.data.error`.

## Osan 3 tärkeimmät opit

1. route määrittelee mitä tiettyyn url-osoitteeseen ja http-metodiin vastataan.
2. tietokantaoperaatiot ovat asynkronisia, joten onnistuminen ja virheet käsitellään promisen kautta.
3. salaisuudet kuuluvat ympäristömuuttujiin, eivät lähdekoodiin tai git-historiaan.
