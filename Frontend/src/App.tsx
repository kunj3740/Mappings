import { useState } from 'react';
import { LocationPermissionModal } from '@/components/location/LocationPermissionModal';
import { LocationSelector } from '@/components/location/LocationSelector';
import { AddressForm } from '@/components/address/AddressForm';
import { AddressList } from '@/components/address/AddressList';
import { LocationPermissionState, Address } from '@/types/address';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import './App.css';

function App() {
  const [locationPermission, setLocationPermission] = useState<LocationPermissionState>({
    granted: false,
    denied: false,
    requesting: true,
  });
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [addresses] = useState<Address[]>([]);

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationPermission({
            granted: true,
            denied: false,
            requesting: false,
          });
        },
        () => {
          setLocationPermission({
            granted: false,
            denied: true,
            requesting: false,
          });
        }
      );
    }
  };

  const handleSearchManually = () => {
    setLocationPermission({
      granted: false,
      denied: false,
      requesting: false,
    });
  };

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LocationPermissionModal
        open={locationPermission.requesting}
        onEnableLocation={handleEnableLocation}
        onSearchManually={handleSearchManually}
      />

      {!locationPermission.requesting && (
        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="select">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Location</TabsTrigger>
              <TabsTrigger value="saved">Saved Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value="select" className="space-y-6">
              <LocationSelector onLocationSelect={handleLocationSelect} />
              {selectedLocation && (
                <AddressForm
                  onSubmit={(data) => {
                    console.log('Form data:', { ...data, ...selectedLocation });
                  }}
                />
              )}
            </TabsContent>
            <TabsContent value="saved">
              <AddressList
                addresses={addresses}
                onSelect={(address) => console.log('Selected:', address)}
                onEdit={(address) => console.log('Edit:', address)}
                onDelete={(id) => console.log('Delete:', id)}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default App;