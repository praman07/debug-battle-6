/** Base API URL — safely formats VITE_API_URL env var or defaults to /api proxy */
const rawApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = (() => {
  if (!rawApiUrl || !rawApiUrl.trim()) return '/api';
  let formatted = rawApiUrl.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }
  return formatted;
})();

export const APP_NAME = 'Debug Battle';
