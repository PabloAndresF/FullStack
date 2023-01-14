const express = require('express')
const logger = require('./loggerMiddeleware')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(logger)
app.use(cors())

let notes = [
  {
    id: 1,
    content: 'HTML is Hard',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello Asus</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((not) => not.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
  //   {
  //     note ? res.json(note) : res.status(404).end()
  //   }
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(404).json({ error: 'note.content is messing' })
  }
  //   !note || !note.content
  //     ? res.status(404).json({ error: 'note.content is messing' })
  //     : ''
  const ids = notes.map((i) => i.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  // notes = [...notes, newNote];
  console.log(newNote)
  notes = notes.concat(newNote)
  res.status(201).json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)
  res.status(204).end()
})

app.use((req, res) => {
  console.log(req.path)
  res.status(404).json({
    error: 'Not Found 404'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server Runnig on port ${PORT}`)
})
