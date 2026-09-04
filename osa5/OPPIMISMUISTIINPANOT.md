# osa 5:n tärkeimmät opit

## kirjautuminen

backend palauttaa kirjautumisesta tokenin. frontend tallentaa käyttäjän local storageen ja lisää tokenin suojattujen pyyntöjen auth-headeriin.

## komponentit ja ref

lomake ja yksittäinen blogi ovat omia komponenttejaan. togglable-komponentin ref antaa app-komponentille mahdollisuuden sulkea lomake onnistuneen tallennuksen jälkeen.

## komponenttitestit

react testing library testaa käyttöliittymää käyttäjän näkökulmasta. testeissä etsitään näkyviä tekstejä, labeleita ja painikkeita ja varmistetaan tapahtumankäsittelijöiden kutsut.

## end to end -testit

playwright avaa oikean selaimen ja käyttää koko sovellusta frontendistä tietokantaan asti. tunnettu alkutila tekee testeistä toisistaan riippumattomia.
