import { useState, useEffect } from "react";
import { fetchWeather } from "../requests";

export const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const fetchWeatherData = async () => {
          try {
          const data = await fetchWeather(city)
          console.log('Weather data response:', data)
          setWeatherData(data)
          } catch (error) {
          console.error('Error fetching weather data:', error)
          }
        }
        fetchWeatherData()
        }, [])
    
    if (!weatherData) {
      return <div>Loading weather data...</div>
    }

    return (
      <div>
        <h3>Weather Forecast for Today in {city}</h3>
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