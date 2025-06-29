import { useState } from 'react'
import Names from "./components/Names"

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')

  const nameOnChange = (event) => {
    setNewName(event.target.value)
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
    } else {
      const newNameObject = {
        name: newName,
        id: newName
      }
      setPersons(persons.concat(newNameObject))
      setNewName("")
    }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={nameSubmit}>
        <div>
          name: <input value={newName} onChange={nameOnChange}/>
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