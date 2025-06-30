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
    if (newFilter.length>0) {
    } else {
      let totalLength = persons.length
      if (checkExists(persons) && newNumber.length>0) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          let personId = (getId(persons) + 1).toString()
          const newPersonObject = {
          name: newName,
          number: newNumber,
          id: personId
        }
        const resultPersons = persons.filter(person => person.name !== newName)
        personServices
                      .update(personId,newPersonObject)
                      .then(response=>{
                        setPersons(resultPersons.concat(response.data))
                        setNewName("")
                        setNewNumber("")
                      })
        }
      } else if (checkExists(persons) && newNumber.length===0) {
        alert(`${newName} already exists`)
        setNewName("")
        setNewNumber("")
      }else {
        const newPersonObject = {
          name: newName,
          number: newNumber,
          id: (totalLength+1).toString()
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

  const getId = (array1) => {
    let namesArray = array1.map(item => item.name)
    return namesArray.indexOf(newName)
  }

  const resetFilter = () => {
    initiatePersons()
    setNewFilter("")
  }

  return (
    <div>
      <Title text={"Phonebook"} />
      <Form type={"I"} text={"Filter shown with"} newValue={newFilter} onChange={filterOnChange} />
      <Button onClick={resetFilter} text={"Reset filter"} />
      <Title text={"Add a new"} />
      <Form type={"IIS"} text1={"name"} text2={"number"} text3={"submit"} newValue1={newName} onChange1={nameOnChange} newValue2={newNumber} onChange2={numberOnChange} onSubmit={nameSubmit}/>
      <Title text={"Numbers"} />
      <Names parts={persons} setPersonsState={setPersons}/>
    </div>
  )
}

export default App

/*const resultPersons = parts.filter(person => person.number !== newNumber)*/