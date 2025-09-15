import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { addPerson, fetchPersons } from './requests'
import HomePage from './components/HomePage'
import Calendar from './components/Calendar'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', age: '' })

  useEffect(() => {
    const getPersons = async () => {
      const data = await fetchPersons()
      setPersons(data)
    }
    getPersons()
  }, [])

  const handleAddPerson = async (event) => {
    event.preventDefault()
    const { name, age } = newPerson
    console.log('Adding person:', { name, age })
    const newAddedPerson = await addPerson({ name, age: Number(age) })
    console.log('Response from server:', newAddedPerson)
    setPersons((prev) => [...prev, newAddedPerson])
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
          <Route path="/calendar" element={<Calendar />} />
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
