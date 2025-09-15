import axios from 'axios'

export const fetchPersons = async () => {
  try {
    const response = await axios.get('/api/persons')
    return response.data
  } catch (error) {
    console.error('Error fetching persons:', error)
    throw error
  }
}

export const fetchEvents = async () => {
  try {
    const response = await axios.get('/api/events')
    return response.data
  } catch (error) {
    console.error('Error fetching events:', error)
    throw error
  }
}

export const addPerson = async (person) => {
  try {
    const response = await axios.post('/api/persons', person)
    return response.data
  } catch (error) {
    console.error('Error adding person:', error)
    throw error
  }
}

export const addEvent = async (event) => {
  try {
    const response = await axios.post('/api/events', event)
    return response.data
  } catch (error) {
    console.error('Error adding event:', error)
    throw error
  }
}

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`/api/weather?city=${city}`)
    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
