import { useState,useEffect } from 'react'
import Names from "./components/Names"
import Title from './components/Title'
import Form from './components/Form'
import Button from './components/Button'
import personServices from './services/persons'
import Noti from './components/Noti'

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

  const [notification, setNotification] = useState(null)

  const nameSubmit = (event) => {
    event.preventDefault()
    if (newFilter.length>0) {
      alert("Reset filter first")
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
                        setNotification(`Changed ${newName}'s number to ${newNumber}`)
                      })
                      .catch(error => {
                        setNotification(`Information of ${newName} has already been removed from server`)
                        setTimeout(()=>{
                          setNotification(null)
                        },5000)
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
                        setNotification(`Added ${newName}`)
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
}

  const filteredPersons = newFilter.length === 0
    ? persons
    : persons.filter(person =>
        person.name.toUpperCase().includes(newFilter.toUpperCase())
      )

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
    <div className='mainDiv'>
      <Title text={"Phonebook"} />
      <Noti message={notification} />
      <div className='filterDiv'>
        <Form type={"I"} text={"Filter shown with:"} newValue={newFilter} onChange={filterOnChange} />
        <Button onClick={resetFilter} text={"Reset filter"} />
      </div>
      <Title text={"Add a new"} />
      <Form type={"IIS"} text1={"Name:"} text2={"Number:"} text3={"Submit"} newValue1={newName} onChange1={nameOnChange} newValue2={newNumber} onChange2={numberOnChange} onSubmit={nameSubmit}/>
      <Title text={"Numbers"} />
      <Names parts={filteredPersons} setPersonsState={setPersons} setNotiState={setNotification}/>
    </div>
  )
}

export default App