import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MAPS_CONFIG } from '@/config/maps';
import { MapContainer } from './MapContainer';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';
import { MapControls } from './MapControls';
import { usePlacesSearch } from '@/hooks/usePlacesSearch';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface LocationSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

export function LocationSelector({ onLocationSelect }: LocationSelectorProps) {
  const [center, setCenter] = useState(MAPS_CONFIG.defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(MAPS_CONFIG.defaultCenter);
  const [searchQuery, setSearchQuery] = useState('');
  const { search, loading, results } = usePlacesSearch();

  const handleLocateMe = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(newPosition);
          setMarkerPosition(newPosition);
          onLocationSelect(newPosition);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [onLocationSelect]);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newPosition = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        onLocationSelect(newPosition);
      }
    },
    [onLocationSelect]
  );

  const handleMarkerDrag = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newPosition = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        onLocationSelect(newPosition);
      }
    },
    [onLocationSelect]
  );

  const handleSearch = useCallback(() => {
    search(searchQuery);
  }, [search, searchQuery]);

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const newPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(newPosition);
      setMarkerPosition(newPosition);
      onLocationSelect(newPosition);
      setSearchQuery(place.formatted_address || '');
    }
  }, [onLocationSelect]);

  useEffect(() => {
    handleLocateMe();
  }, [handleLocateMe]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
          loading={loading}
        />
        <SearchResults results={results} onSelect={handlePlaceSelect} />
      </div>

      <MapContainer>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={MAPS_CONFIG.defaultZoom}
          onClick={handleMapClick}
        >
          <Marker 
            position={markerPosition} 
            draggable={true}
            onDragEnd={handleMarkerDrag}
          />
        </GoogleMap>
      </MapContainer>

      <MapControls onLocateMe={handleLocateMe} />
    </div>
  );
}