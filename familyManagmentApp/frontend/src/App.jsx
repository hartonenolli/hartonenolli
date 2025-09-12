import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import Calendar from './components/Calendar'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', age: '' })
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await axios.get('/api/persons')
      setPersons(response.data)
    }
    const fetchEvents = async () => {
      const response = await axios.get('/api/events')
      const eventsObjects = response.data.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
      setEvents(eventsObjects)
    }

    fetchPersons()
    fetchEvents()
  }, [])

  const handleAddPerson = async (event) => {
    event.preventDefault()
    const { name, age } = newPerson
    console.log('Adding person:', { name, age })
    const response = await axios.post('/api/persons', {
      name,
      age: Number(age),
    })
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
    <Router>
      <div className="container">
        <h1>Family Management App</h1>
        <Link to="/">Home</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/persons">Persons</Link>
        <Link to="/add-person">Add Person</Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar events={events} />} />
          <Route
            path="/add-person"
            element={
              <>
                <PersonForm
                  handleAddPerson={handleAddPerson}
                  handleInputChange={handleInputChange}
                  newPerson={newPerson}
                />
                <Persons persons={persons} />
              </>
            }
          />
          <Route path="/persons" element={<Persons persons={persons} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
