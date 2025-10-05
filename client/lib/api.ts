import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://better-hack-the-fremen-7vs5.onrender.com/api/',
});