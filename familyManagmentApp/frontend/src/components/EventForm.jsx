import { useState } from 'react'
import { addEvent } from '../requests'

export const EventForm = ({ events, setEvents }) => {
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
        {
          ...savedEvent,
          start: new Date(savedEvent.start),
          end: new Date(savedEvent.end),
        },
      ])
      setNewEvent({ title: '', start: '', end: '' })
    } catch (error) {
      console.log('Error adding event', error)
    }
  }

  return (
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
}
