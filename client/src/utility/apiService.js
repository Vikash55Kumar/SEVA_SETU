// apiService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://seva-setu.onrender.com/api/v1";

const apiClient = axios.create({
    baseURL: API_URL,
});

export default apiClient;
