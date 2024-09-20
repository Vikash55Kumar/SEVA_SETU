import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // This will pick up the VITE_API_URL from .env
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Get access token from localStorage
  },
});

console.log("Axios baseURL:", import.meta.env.VITE_API_URL); // Add this line to check the URL

export default api;
