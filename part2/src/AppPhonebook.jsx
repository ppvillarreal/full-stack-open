import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const AppPhonebook = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    console.log('Running effect hook')
    personService
      .getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    if(persons.map(person => person.name).includes(newName)){
        alert(`${newName} is already added to phonebook`)
    } else {
        const personObject = {
            name: newName,
            number: newNumber
        }

        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            console.log('New person name set in server and application status')
          })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterChangeFunction={handleFilterChange}/>
      <h2>Add New Contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons ={persons} filter={filter}/>
    </div>
  )
}

export default AppPhonebook