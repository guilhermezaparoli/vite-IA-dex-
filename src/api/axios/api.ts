import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5555/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
