import { useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', age: '' })

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await axios.get('/api/persons')
      setPersons(response.data)
    }

    fetchPersons()
  }, [])

  const handleAddPerson = async (event) => {
    event.preventDefault()
    const { name, age } = newPerson
    console.log('Adding person:', { name, age })
    const response = await axios.post('/api/persons', { name, age: Number(age) })
    console.log('Response from server:', response.data)
    setPersons((prev) => [...prev, response.data])
    setNewPerson({ name: '', age: '' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPerson((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="container">
      <Calendar />
      <PersonForm handleAddPerson={handleAddPerson} handleInputChange={handleInputChange} newPerson={newPerson} />
      <h2>Persons:</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.age} years old
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
