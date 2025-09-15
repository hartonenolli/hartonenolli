import { useEffect, useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'


const Calendar = ({ events }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get('/api/weather?city=Helsinki');
      setWeatherData(response.data);
      console.log('Weather data response:', response.data);
    };
    fetchWeatherData();
  }, [events])

  const locales = { 'en-US': enUS }
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  })


  const WeatherForToday = () => {
    if (!weatherData) {
      return <div>Loading weather data...</div>;
    }

    return (
      <div>
        <h3>Weather Forecast for Today in Helsinki</h3>
        <ul>
          <li>Temperature: {weatherData.current.temp_c} °C</li>
          <li>Condition: {weatherData.current.condition.text}</li>
          <li>Humidity: {weatherData.current.humidity} %</li>
          <li>Wind: {weatherData.current.wind_kph} kph</li>
          <li>
            <img src={weatherData.current.condition.icon} alt="Weather icon" />
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div>
      <WeatherForToday />
      <h2>Calendar</h2>
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
