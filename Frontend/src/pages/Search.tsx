import { useEffect, useState } from 'react';
import { LocationModal } from "../components/location/LocationModal";

export const Search = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setShowLocationModal(true);
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      if (permission.state === 'denied') {
        setShowLocationModal(true);
      }
    } catch (error) {
      setShowLocationModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <LocationModal 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </div>
  );
};