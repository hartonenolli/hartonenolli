import { useEffect, useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { fetchEvents, addEvent } from '../requests'
import { Weather } from './Weather'

const EventForm = ({ newEvent, handleInputChange, handleAddEvent }) => (
  <form onSubmit={handleAddEvent}>
    <h3>Add new event:</h3>
    <input
      type="text"
      name="title"
      placeholder="Event title"
      value={newEvent.title}
      onChange={handleInputChange}
      required
    />
    <input
      type="datetime-local"
      name="start"
      value={newEvent.start}
      onChange={handleInputChange}
      required
    />
    <input
      type="datetime-local"
      name="end"
      value={newEvent.end}
      onChange={handleInputChange}
      required
    />
    <button type="submit">Add Event</button>
  </form>
)

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' })

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchEvents()
        console.log('Events data response:', data)
        const eventsObjects = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
        setEvents(eventsObjects)
      } catch (error) {
        console.error('Error fetching events data:', error)
      }
    }
    fetchEventData()
    }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    try {
      const eventToAdd = {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      }
    const savedEvent = await addEvent(eventToAdd)
    setEvents((prev) => [
      ...prev,
      { ...savedEvent, start: new Date(savedEvent.start), end: new Date(savedEvent.end) },
    ])
    setNewEvent({ title: '', start: '', end: ''})
    } catch (error) {
      console.log('Error adding event', error);
    }
  }

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
      <Weather city="Helsinki" />
      <h2>Calendar</h2>
      <EventForm
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        handleAddEvent={handleAddEvent}
      />
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
      />
    </div>
  )
}

export default Calendar
