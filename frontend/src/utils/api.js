const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to make API requests using fetch
const makeRequest = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// NASA API endpoints
export const nasaAPI = {
  // Astronomy Picture of the Day
  getAPOD: (params = {}) => makeRequest('/apod', params),
  
  // Mars Rover Photos
  getMarsRover: (params = {}) => makeRequest('/mars-rover', params),
  getMarsRovers: () => makeRequest('/mars-rovers'),
  getRoverManifest: (rover) => makeRequest(`/rover-manifest/${rover}`),
  
  // Earth Polychromatic Imaging Camera
  getEPIC: (params = {}) => makeRequest('/epic', params),
  
  // Near Earth Objects
  getNEO: (params = {}) => makeRequest('/neo', params),
  
  // NASA Image and Video Library Search
  searchNASA: (params = {}) => makeRequest('/search', params),
  
  // Health check
  healthCheck: () => makeRequest('/health'),
};

export default nasaAPI; 