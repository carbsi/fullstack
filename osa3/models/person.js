const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

if (!url) {
  console.error('mongodb connection string is missing')
  process.exit(1)
}

console.log('connecting to mongodb')

mongoose.connect(url, { family: 4 })
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log('error connecting to mongodb:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: value => /^\d{2,3}-\d+$/.test(value),
      message: props => `${props.value} is not a valid phone number`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // oma huomio: frontend käyttää id:tä, joten mongoosen _id muutetaan tässä
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
