// Load environment variables from .env file
require('dotenv').config() 

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// Import the Mongoose model we created
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// Use morgan, but only if it's not a POST request
// (We will make a custom POST logger later if needed)
app.use(morgan('tiny', {
  skip: (req, res) => req.method === 'POST'
}))

// --- OLD DATA IS GONE ---
// let persons = [ ... ] 
// We no longer need this, it's all in MongoDB!

// --- ROUTES ---

// GET ALL: Fetches all persons from the database
app.get('/api/persons', (req, res) => {
  // Use the Person model to find all documents
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// GET ONE: Fetches a single person by their ID
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      // If no person is found with that ID
      res.status(404).end()
    }
  })
  // We'll add error handling (like for a malformed ID) in Osa 3c
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
})

// DELETE ONE: Deletes a person by their ID
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      // The delete was successful
      res.status(204).end()
    })
    .catch(error => next(error)) // Passes error to a future error handler
})

// ADD ONE: Creates a new person and saves to database
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Basic validation (we will improve this in Osa 3c)
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  // Create a new Person object based on the Mongoose model
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  // Save the new person to the database
  person.save().then(savedPerson => {
    // Respond with the saved person
    res.json(savedPerson)
  })
})

// --- SERVER SETUP ---
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})