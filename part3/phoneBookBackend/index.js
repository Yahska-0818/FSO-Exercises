const express = require('express')
const app =  express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('content', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time :content', {
    skip: function (req, res) { 
        return !(req.method === "POST")
     }
}))

app.use(cors())
app.use(express.static('dist'))

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/info',(request,response)=> {
    const dateNew = new Date()
    response.send(`
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${dateNew}</div>
    `);
})

app.get('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.delete('/api/persons/:id',(request,response)=> {
    const id = request.params.id
    const person = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
    let person = request.body
    if (!person.name || !person.number) {
        return response.status(200).json({ 
            error: 'content missing' 
        })
    }

    namesList = persons.map(person=>person.name)
    
    if (namesList.includes(person.name)) {
        return response.status(200).json({ 
            error: 'name must be unique' 
        })
    }


    person.id = Math.floor(Math.random()*10**6)
    persons.push(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})