import { useState } from 'react'
import Names from "./components/Names"
import Title from './components/Title'
import Form from './components/Form'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const effect = () => {
    axios.get('http://localhost:3001/persons').then(response=>setPersons(response.data))
  }

  useEffect(effect,[])

  const [persons, setPersons] = useState([])

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
      }

      axios
          .post("http://localhost:3001/persons",newPersonObject)
          .then(respone=>{
            setPersons(persons.concat(respone.data))
          })
      setNewName("")
      setNewNumber("")
    }
    }
  return (
    <div>
      <Title text={"Phonebook"} />
      <Form type={"I"} text={"Filter shown with"} newValue={newFilter} onChange={filterOnChange} />
      <Title text={"Add a new"} />
      <Form type={"IIS"} text1={"name"} text2={"number"} text3={"submit"} newValue1={newName} onChange1={nameOnChange} newValue2={newNumber} onChange2={numberOnChange} onSubmit={nameSubmit}/>
      <Title text={"Numbers"} />
      <Names parts={persons} />
    </div>
  )
}

export default App