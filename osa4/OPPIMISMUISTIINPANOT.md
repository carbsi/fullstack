# osa 4:n tärkeimmät opit

## sovelluksen rakenne

reitit, tietokantamallit ja yleiset apufunktiot kannattaa pitää eri tiedostoissa. silloin yhden osan muuttaminen ei tee koko sovelluksesta vaikeasti luettavaa.

## testit

yksikkötesti tarkistaa yhden apufunktion. api-testi lähettää oikean http-pyynnön sovellukselle ja tarkistaa samalla tietokannan toiminnan. jokaisen testin alussa tietokanta palautetaan tunnettuun tilaan.

## käyttäjä ja token

salasanasta tallennetaan vain bcrypt-tiiviste. kirjautumisessa palvelin palauttaa allekirjoitetun tokenin. suojattu reitti tarkistaa tokenin ja etsii sen perusteella käyttäjän.

## viittaukset

blogi sisältää käyttäjän id:n ja käyttäjä sisältää omien blogiensa id:t. populate korvaa nämä id:t vastauksen kannalta hyödyllisillä tiedoilla.
