import { useState } from 'react'

const AppPhonebook = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
  }

  const filterContacts = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
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

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
      <h2>Add New Contact</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(
        person => <p key={person.name}> {person.name}: {person.number}</p>
        )}
    </div>
  )
}

export default AppPhonebook