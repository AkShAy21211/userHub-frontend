import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

console.log(process.env);