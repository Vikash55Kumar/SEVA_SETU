import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // The base URL is taken from environment variables
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;
