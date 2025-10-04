import { createFetch } from '@better-fetch/fetch';

export const api = createFetch({
  baseURL: 'http://localhost:3005',
  throw: true, // Optional: throws errors instead of returning them
});
