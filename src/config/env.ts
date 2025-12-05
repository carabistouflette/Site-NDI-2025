// Environment configuration
// In production, API calls go through nginx proxy (same origin = no CORS)
// In development, use localhost backend directly
export const config = {
    apiUrl: import.meta.env.DEV ? 'http://localhost:3001' : ''
}
