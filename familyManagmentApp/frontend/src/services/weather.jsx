import axios from "axios"
const WeatherService = async (city) => {
  try {
    const response = await axios.get(`/api/weather?city=${city}`)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}

export default WeatherService