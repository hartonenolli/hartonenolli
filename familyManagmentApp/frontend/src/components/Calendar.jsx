import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { EventForm } from './EventForm'
import { Weather } from './Weather'
import { useEvents } from '../hooks/useEvents'

const Calendar = () => {
  const [events, setEvents] = useEvents()

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
      <EventForm events={events} setEvents={setEvents} />
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
