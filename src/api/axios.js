import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});

export const laravelApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
