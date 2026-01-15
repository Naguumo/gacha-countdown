import { up } from 'up-fetch';

export const fetchClient = up(fetch, () => ({
  dedupe: true,
  baseUrl: 'http://localhost:3000/',
  retry: {
    // One retry for GET requests, no retries for other methods:
    attempts: (ctx) => (ctx.request.method === 'GET' ? 3 : 0),
    delay: (ctx) => ctx.attempt ** 2 * 1000,
  },
}));
