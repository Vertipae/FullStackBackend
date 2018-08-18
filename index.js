//backend

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

// app.use(morgan('tiny'))

morgan.token('data', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :data :res[content-length] - :response-time ms'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
// Info
app.get('/info', (req, res) => {
    res.send(`<p> Puhelinluettelossa on ${persons.length} henkilön tiedot </p><p>${new Date()}</p>`)
})
// Hae yksittäinen id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// Poista
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// Lisää
app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return Response.status(400).json({ error: 'Missing name or number' })
    }

    let oldName = function (param) {
        return param.name === body.name
    }

    if (persons.some(oldName)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * Math.floor(10000))
    }

    persons = persons.concat(person)

    res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
// const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })