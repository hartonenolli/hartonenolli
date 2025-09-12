import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const Calendar = () => {
    const locales = { 'en-US': enUS }
    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
      getDay,
      locales,
    })

    const exampleEvents = [
      {
        title: 'Sample Event',
        start: new Date(),
        end: new Date(),
      },
    ]

    return (
      <div>
        <h2>Calendar Component</h2>
        <BigCalendar
          localizer={localizer}
          events={exampleEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    )
  }

  export default Calendar