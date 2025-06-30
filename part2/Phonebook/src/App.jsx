import { useState,useEffect } from 'react'
import Names from "./components/Names"
import Title from './components/Title'
import Form from './components/Form'
import Button from './components/Button'
import personServices from './services/persons'

const App = () => {
  const initiatePersons = () => {
    personServices
                  .getAll()
                  .then(response => {
                    setPersons(response.data)
                  })
                  
  }

  useEffect(initiatePersons,[])

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  const nameSubmit = (event) => {
    event.preventDefault()
    let totalLength = persons.length
    if (checkExists(persons)) {
      alert(`${newName} already exists`)
      setNewName("")
      setNewNumber("")
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: totalLength+1
      }

      personServices
                    .create(newPersonObject)
                    .then(response=>{
                      setPersons(persons.concat(response.data))
                      setNewName("")
                      setNewNumber("")
                    })
    }
    }

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

  const resetFilter = () => {
    initiatePersons()
    setNewFilter("")
  }

  return (
    <div>
      <Title text={"Phonebook"} />
      <Form type={"I"} text={"Filter shown with"} newValue={newFilter} onChange={filterOnChange} />
      <Button onClick={resetFilter} text={"Reset button"} />
      <Title text={"Add a new"} />
      <Form type={"IIS"} text1={"name"} text2={"number"} text3={"submit"} newValue1={newName} onChange1={nameOnChange} newValue2={newNumber} onChange2={numberOnChange} onSubmit={nameSubmit}/>
      <Title text={"Numbers"} />
      <Names parts={persons} />
    </div>
  )
}

export default App