/** Base API URL — proxied through Vite dev server in development or VITE_API_URL env var in production */
export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const APP_NAME = 'Debug Battle';
