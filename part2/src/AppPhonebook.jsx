import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const AppPhonebook = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.map(person => person.name).includes(newName)){
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirm){
        const person_id = persons.filter(person => person.name === newName).map(person => person.id)
        personService
          .update(person_id, personObject)
          .then(returnedPerson => {
            const newPersons = persons.map(person => person.id != person_id ? person : returnedPerson)
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
            console.log('Person name updated in server and application status')
            setNotificationMessage(`${returnedPerson.name} was updated on your phonebook`)
            setTimeout(()=>setNotificationMessage(null),5000)
          }).catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(()=>setErrorMessage(null),5000)
          })
      }  
    } else {
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            console.log('New person name set in server and application status')
            setNotificationMessage(`${returnedPerson.name} was added to your phonebook`)
            setTimeout(()=>setNotificationMessage(null),5000)
          })
    }
  }

  const deletePerson = (person) => {
    const confirm = window.confirm(`Delete ${person.name}?`)
    if (confirm) {
      personService
        .deletePerson(person)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNewName('')
          setNewNumber('')
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
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
      <Filter filterValue={filter} filterChangeFunction={handleFilterChange}/>
      <h2>Add New Contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons ={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default AppPhonebook