import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 tracking-tight mb-6">
            Find and Save Your
            <span className="block">Perfect Location</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
            Easily search, select, and save your delivery locations with our intuitive location service powered by Google Maps.
          </p>
          <div className="mt-10">
            <Link
              to="/search"
              className="inline-flex items-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};