const mongoose = require('mongoose')

// Ladataan .env-tiedoston muuttujat käyttöön
require('dotenv').config()

// Otetaan MONGODB_URI-muuttuja .env-tiedostosta
const url = process.env.MONGODB_URI

console.log('Yhdistetään tietokantaan...')

// Yhdistetään tietokantaan
mongoose.connect(url)
  .then(result => {
    console.log('Yhdistetty MongoDB:hen!')
  })
  .catch((error) => {
    console.log('Virhe yhdistäessä MongoDB:hen:', error.message)
  })

// Määritellään "skeema" eli rakenne henkilölle
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Muokataan skeeman toJSON-metodia (miten data palautetaan)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Muutetaan tietokannan _id-objekti id-merkkijonoksi
    returnedObject.id = returnedObject._id.toString()
    // Poistetaan turhat _id ja __v kentät palautuksesta
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Viedään malli (Model) käytettäväksi muissa tiedostoissa
module.exports = mongoose.model('Person', personSchema)