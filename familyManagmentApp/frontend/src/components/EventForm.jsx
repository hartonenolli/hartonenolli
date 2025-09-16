export const EventForm = ({ newEvent, handleInputChange, handleAddEvent }) => {
  return (  
    <form onSubmit={handleAddEvent}>
      <h3>Add new event:</h3>
      <input
        type="text"
        name="title"
        placeholder="Event title"
        value={newEvent.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="datetime-local"
        name="start"
        value={newEvent.start}
        onChange={handleInputChange}
        required
      />
      <input
        type="datetime-local"
        name="end"
        value={newEvent.end}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
}
