import { addPerson } from '../requests'

const PersonForm = ({ newPerson, setNewPerson, setPersons }) => {
  const handleAddPerson = async (event) => {
    event.preventDefault()
    const { name, age } = newPerson
    console.log('Adding person:', { name, age })
    const newAddedPerson = await addPerson({ name, age: Number(age) })
    console.log('Response from server:', newAddedPerson)
    setPersons((prev) => [...prev, newAddedPerson])
    setNewPerson({ name: '', age: '' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPerson((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <h2>Add New Person</h2>
      <form onSubmit={handleAddPerson}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newPerson.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newPerson.age}
          onChange={handleInputChange}
        />
        <button type="submit">Add Person</button>
      </form>
    </>
  )
}

export default PersonForm
