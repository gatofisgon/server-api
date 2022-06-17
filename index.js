const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const generarID = () => {
  return Math.floor(Math.random() * 1000000)
}

let notes = [
  {
    id: 1,
    title: 'My next trip',
    body: 'I would like to go to Spain'
  },
  {
    id: 2,
    title: 'Habbits to work on',
    body: 'Exercise. Eating a bit better.'
  },
  {
    id: 3,
    title: 'Office modification',
    body: 'Get a new seat'
  }
]

app.get('/', (req, res) => {
  res.send("<h1>I'm just a simple API for Insomnia Testing</h1>")
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const noteFilter = notes.filter(note => note.id !== id)
  if (noteFilter.length !== notes.length) {
    res.status(204).end()
    notes = noteFilter
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const newId = generarID()
  const newNote = {
    id: newId,
    title: req.body.title,
    body: req.body.body
  }
  notes.push(newNote)
  res.status(201).json(newNote)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running at http://localhost:${PORT}/`)
