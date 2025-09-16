import { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addEvent } from '../requests'
import { EventForm } from './EventForm'
import { Weather } from './Weather'
import { useEvents } from '../hooks/useEvents'

const Calendar = () => {
  const [events, setEvents] = useEvents()
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' })

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
      setNewEvent({ title: '', start: '', end: '' })
    } catch (error) {
      console.log('Error adding event', error)
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
      <h2>Calendar</h2>
      <Weather city="Helsinki" />
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
