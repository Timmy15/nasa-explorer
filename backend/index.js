const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// NASA API base URL and key
const NASA_API_BASE = 'https://api.nasa.gov';
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY'; // Use DEMO_KEY for development

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint - API information
app.get('/', (req, res) => {
  res.json({
    message: '🚀 NASA Explorer Backend API',
    version: '1.0.0',
    description: 'A backend service that provides access to NASA APIs',
    endpoints: {
      apod: '/api/apod - Astronomy Picture of the Day',
      marsRover: '/api/mars-rover - Mars Rover Photos',
      epic: '/api/epic - Earth Polychromatic Imaging Camera',
      neo: '/api/neo - Near Earth Objects',
      search: '/api/search - NASA Image and Video Library',
      marsRovers: '/api/mars-rovers - Available Mars Rovers',
      roverManifest: '/api/rover-manifest/:rover - Rover Manifest',
      health: '/api/health - Health Check'
    },
    documentation: 'This API serves as a proxy to NASA\'s public APIs',
    status: 'running'
  });
});

// Helper function to make NASA API requests
const makeNASARequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${NASA_API_BASE}${endpoint}`, {
      params: {
        ...params,
        api_key: NASA_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('NASA API Error:', error.response?.data || error.message);
    throw error;
  }
};

// Routes

// 1. Astronomy Picture of the Day (APOD)
app.get('/api/apod', async (req, res) => {
  try {
    const { date, start_date, end_date, count, thumbs } = req.query;
    const data = await makeNASARequest('/planetary/apod', {
      date, start_date, end_date, count, thumbs
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

// 2. Mars Rover Photos
app.get('/api/mars-rover', async (req, res) => {
  try {
    const { rover, sol, earth_date, camera, page } = req.query;
    const data = await makeNASARequest(`/mars-photos/api/v1/rovers/${rover || 'curiosity'}/photos`, {
      sol, earth_date, camera, page
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars rover data' });
  }
});

// 3. Earth Polychromatic Imaging Camera (EPIC)
app.get('/api/epic', async (req, res) => {
  try {
    const { date } = req.query;
    const data = await makeNASARequest('/EPIC/api/natural', { date });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch EPIC data' });
  }
});

// 4. Near Earth Objects (NeoWs)
app.get('/api/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const data = await makeNASARequest('/neo/rest/v1/feed', {
      start_date, end_date
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

// 5. NASA Image and Video Library
app.get('/api/search', async (req, res) => {
  try {
    const { q, media_type, year_start, year_end } = req.query;
    const data = await makeNASARequest('/search', {
      q, media_type, year_start, year_end
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search NASA library' });
  }
});

// 6. Get available Mars rovers
app.get('/api/mars-rovers', async (req, res) => {
  try {
    const data = await makeNASARequest('/mars-photos/api/v1/rovers');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars rovers' });
  }
});

// 7. Get rover manifest
app.get('/api/rover-manifest/:rover', async (req, res) => {
  try {
    const { rover } = req.params;
    const data = await makeNASARequest(`/mars-photos/api/v1/manifests/${rover}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rover manifest' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'NASA Explorer Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NASA Explorer Backend running on port ${PORT}`);
  console.log(`📡 NASA API Key: ${NASA_API_KEY === 'DEMO_KEY' ? 'Using DEMO_KEY (limited requests)' : 'Using custom key'}`);
}); 