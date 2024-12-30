export const MAPS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  defaultCenter: {
    lat: 51.5074,
    lng: -0.1278,
  },
  defaultZoom: 15,
  libraries: ['places'] as const,
};