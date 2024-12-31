import { Link } from 'react-router-dom';
import { MapPin, Navigation, Search } from 'lucide-react';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            <span className="block">Find and Save Your</span>
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Perfect Location
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            Easily search, select, and save your delivery locations with our intuitive location service powered by Google Maps.
          </p>
          
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Location
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <Search className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Places</h3>
            <p className="text-gray-400">
              Find any location using our powerful search powered by Google Maps
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <MapPin className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save Addresses</h3>
            <p className="text-gray-400">
              Save your frequently used locations for quick access
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <Navigation className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Get Directions</h3>
            <p className="text-gray-400">
              View directions and navigate to your saved locations easily
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};