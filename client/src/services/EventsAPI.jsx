// Fetch all events
async function getAllEvents() {
    try {
      const response = await fetch('http://localhost:3000/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not fetch events:", error);
      throw error;
    }
  }
  
  // Fetch a specific event by ID
  async function getEventById(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/events/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Event not found
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Could not fetch event with id ${id}:`, error);
      throw error;
    }
  }
  
export {getAllEvents, getEventById}
  