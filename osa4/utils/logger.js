// info ei tulosta mitaan testien ajon aikana, ettei lokit tuki testituloksia
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}



// virheet tulostetaan aina, myos testien aikana
const error = (...params) => {
  console.error(...params)
}

module.exports = { info, error }
