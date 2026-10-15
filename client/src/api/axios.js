import axios from 'axios';

// Shared Axios instance pointing to your Express API baseURL
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;