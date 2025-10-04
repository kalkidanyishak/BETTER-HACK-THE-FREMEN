import { BF } from 'better-fetch';

// Example: create an API instance with a base URL
const api = new BF({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});
