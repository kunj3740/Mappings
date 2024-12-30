import { PropsWithChildren, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { MAPS_CONFIG } from '@/config/maps';
import { MapErrorBoundary } from './MapErrorBoundary';

export function MapContainer({ children }: PropsWithChildren) {
  const [error, setError] = useState<string>();

  if (!MAPS_CONFIG.apiKey) {
    return <MapErrorBoundary error="API key missing" />;
  }

  return (
    <LoadScript
      googleMapsApiKey={MAPS_CONFIG.apiKey}
      onError={(error) => setError(error.message)}
    >
      {error ? <MapErrorBoundary error={error} /> : children}
    </LoadScript>
  );
}