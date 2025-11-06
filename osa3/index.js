const express = require('express')
const app = express()

// tää pitää olla et post toimii, joku json-juttu
app.use(express.json())

// tää on "tietokanta"
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

// 3.1: hae kaikki
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// 3.2: info sivu
app.get('/info', (req, res) => {
  const personCount = persons.length
  const requestTime = new Date()

  res.send(
    `<p>Phonebook has info for ${personCount} people</p>
     <p>${requestTime}</p>`
  )
})

// 3.3: hae yks
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end() // 404 jos ei löydy
  }
})

// 3.4: poista
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// joku random id
const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

// 3.5 & 3.6: lisää uus
app.post('/api/persons', (req, res) => {
  const body = req.body

  // 3.6: checkit et nimi ja numero on
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  // tsekataan onko nimi jo
  const nameExists = persons.find(p => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  // 3.5: uuden luonti
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Serveri pöhisee portissa ${PORT}`) // joo
})