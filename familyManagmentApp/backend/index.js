const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const personsFile = path.join(__dirname, 'persons.json');
const eventsFile = path.join(__dirname, 'events.json');
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/persons', (req, res) => {
  const persons = JSON.parse(fs.readFileSync(personsFile, 'utf-8'));
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  const newPerson = { id: generateId(), ...req.body };
  const persons = JSON.parse(fs.readFileSync(personsFile, 'utf-8'));
  persons.push(newPerson);
  fs.writeFileSync(personsFile, JSON.stringify(persons, null, 2));
  res.status(201).json(newPerson);
});

app.get('/api/events', (req, res) => {
  const events = JSON.parse(fs.readFileSync(eventsFile, 'utf-8'));
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const newEvent = { id: generateId(), ...req.body };
  const events = JSON.parse(fs.readFileSync(eventsFile, 'utf-8'));
  events.push(newEvent);
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  res.status(201).json(newEvent);
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
