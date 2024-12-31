import { MapPin, Search, Navigation } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
  if (!isOpen) return null;

  const handleEnableLocation = async () => {
    try {
      await navigator.geolocation.getCurrentPosition(
        () => {
          // Handle success
          onClose();
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } catch (error) {
      console.error('Error requesting location:', error);
    }
  };

  const handleManualSearch = () => {
    onClose();
    // Will implement manual search in next step
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8 border border-gray-800">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-900/50 mb-6 ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900">
            <Navigation className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Enable Location Access
          </h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            To enhance your mapping experience, we need access to your location. 
            Choose to enable location services or search for your address manually.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleEnableLocation}
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-medium group"
          >
            <MapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Enable Location Services
          </button>
          <button
            onClick={handleManualSearch}
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 font-medium group"
          >
            <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Search Manually
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-500 text-center">
            Your location data is only used to provide relevant mapping services and is never stored or shared.
          </p>
        </div>
      </div>
    </div>
  );
};