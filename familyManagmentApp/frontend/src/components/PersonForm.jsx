const PersonForm = ({ handleAddPerson, handleInputChange, newPerson }) => {
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
