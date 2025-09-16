import { useState, useEffect } from 'react'
import { fetchWeather } from '../requests'

export const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeather(city)
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
    fetchWeatherData()
  }, [city])

  return weatherData
}

export default useWeather
