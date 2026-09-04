// import??

require('dotenv').config()

const mongoose = require('mongoose')
const Person = require('./models/person')

const argumentsFromCommandLine = process.argv.slice(2)



const listPersons = () => {
  // tyhjä hakuehto hakee kaikki henkilöt
  return Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  })
}


//MONGODB ADD PERSON
const addPerson = (name, number) => {
  const person = new Person({ name, number })

  // viesti tulostetaan tallennuksen jälkeen
  return person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
  })
}

const showUsage = () => {
  console.log('usage:')
  console.log('  node mongo.js')
  console.log('  node mongo.js "Name" "040-1234567"')
}

let operation


if (argumentsFromCommandLine.length === 0) {
  operation = listPersons()
} else if (argumentsFromCommandLine.length === 2) {
  const [name, number] = argumentsFromCommandLine
  operation = addPerson(name, number)
} else {
  showUsage()
  operation = Promise.resolve()
  process.exitCode = 1
}




operation
  .catch(error => {
    console.error('database operation failed:', error.message)
    process.exitCode = 1
  })
  .finally(() => {
    // yhteys suljetaan operaation jälkeen
    return mongoose.connection.close()
  })
