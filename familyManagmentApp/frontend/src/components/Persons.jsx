export const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons:</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.age} years old
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Persons
