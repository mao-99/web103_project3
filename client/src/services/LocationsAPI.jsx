// Fetch all locations (instead of events)
async function getAllLocations() {
    try {
        const response = await fetch('http://localhost:3000/api/locations');  // Ensure the correct endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch locations:", error);
        throw error;
    }
}

// Fetch a specific location by ID
async function getLocationById(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/locations/${id}`);  // Ensure the correct endpoint
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Location not found
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Could not fetch location with id ${id}:`, error);
        throw error;
    }
}

export default { getAllLocations, getLocationById };
