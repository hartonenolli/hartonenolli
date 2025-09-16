import { useState, useEffect } from 'react'
import { fetchEvents } from '../requests'

export const useEvents = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await fetchEvents()
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

  return [events, setEvents]
}
export default useEvents
