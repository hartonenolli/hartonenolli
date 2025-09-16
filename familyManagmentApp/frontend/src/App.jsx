import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { fetchPersons } from './requests'
import HomePage from './components/HomePage'
import Calendar from './components/Calendar'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import background from './pictures/background.jpg'

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

  return (
    <Router>
      <div style={{ backgroundImage: `url(${background})`, minHeight: '100vh', backgroundSize: 'cover' }}>
      <div className="container">
        <h1>Family Management App</h1>
        <div className='btn-group'>
        <button type="button" className="btn btn-light">
          <Link to="/">Home</Link>
        </button>
        <button type="button" className="btn btn-light">
          <Link to="/calendar">Calendar</Link>
        </button>
        <button type="button" className="btn btn-light">
          <Link to="/persons">Persons</Link>
        </button>
        <button type="button" className="btn btn-light">
          <Link to="/add-person">Add Person</Link>
        </button>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route
            path="/add-person"
            element={
              <>
                <PersonForm
                  newPerson={newPerson}
                  setNewPerson={setNewPerson}
                  setPersons={setPersons}
                />
                <Persons persons={persons} />
              </>
            }
          />
          <Route path="/persons" element={<Persons persons={persons} />} />
        </Routes>
      </div>
      </div>
    </Router>
  )
}

export default App
