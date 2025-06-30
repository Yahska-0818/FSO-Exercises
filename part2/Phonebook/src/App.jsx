import { useState } from 'react'
import Names from "./components/Names"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const nameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const numberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterOnChange = (event) => {
    setNewFilter(event.target.value)
    if (newFilter.length > 0) {
      const result = persons.filter((person) => person.name.toUpperCase().includes(newFilter.toUpperCase()));
      setPersons(result)
    }
  }

  const checkExists = (array1) => {
    let namesArray = array1.map(item => item.name)
    if (namesArray.includes(newName)) {
      return true
    }
  }

  const nameSubmit = (event) => {
    event.preventDefault()
    if (checkExists(persons)) {
      alert(`${newName} already exists`)
      setNewName("")
      setNewNumber("")
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: newName
      }
      setPersons(persons.concat(newPersonObject))
      setNewName("")
      setNewNumber("")
    }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input value={newFilter} onChange={filterOnChange} />
        </div>
      </form>
      <h2>Add a new</h2>
      <form onSubmit={nameSubmit}>
        <div>
          name: <input value={newName} onChange={nameOnChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names parts={persons} />
    </div>
  )
}

export default App