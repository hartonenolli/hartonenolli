import { useEffect, useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const App = () => {
  const [messageFromBackend, setMessageFromBackend] = useState('')
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', age: '' })

  useEffect(() => {
    const fetchMessage = async () => {
      const response = await fetch('/api/message')
      const data = await response.json()
      setMessageFromBackend(data.message)
    }

    fetchMessage()
  }, [])

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await fetch('/api/persons')
      const data = await response.json()
      setPersons(data)
    }

    fetchPersons()
  }, [])

  const handleAddPerson = async (event) => {
    event.preventDefault()
    const { name, age } = newPerson
    console.log('Adding person:', { name, age })
    const response = await fetch('/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age: Number(age) }),
    })
    const addedPerson = await response.json()
    setPersons((prev) => [...prev, addedPerson])
    setNewPerson({ name: '', age: '' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPerson((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const Calendar = () => {
    const locales = { 'en-US': enUS }
    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
      getDay,
      locales,
    })
    return (
      <div>
        <h2>Calendar Component</h2>
        <BigCalendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    )
  }

  return (
    <div className="container">
      <p>Hello world</p>
      <p>Message from backend: {messageFromBackend}</p>
      <Calendar />
      <h2>Add New Person</h2>
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPerson.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newPerson.age}
          onChange={handleInputChange}
        />
        <button type="submit">Add Person</button>
      </form>
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
