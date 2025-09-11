const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const personsFile = path.join(__dirname, 'persons.json');

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
  const newPerson = req.body;
  const persons = JSON.parse(fs.readFileSync(personsFile, 'utf-8'));
  persons.push(newPerson);
  fs.writeFileSync(personsFile, JSON.stringify(persons, null, 2));
  res.status(201).json(newPerson);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
