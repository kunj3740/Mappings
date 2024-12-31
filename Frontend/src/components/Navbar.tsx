import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MapPin } from 'lucide-react';
import { FC } from 'react';
import { LogOut } from 'lucide-react';

interface AvatarProps {
  name: string;
}
interface MyToken {
  name: string;
  id: string;
}

interface UserMenuProps {
  username: string;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}
const Avatar: FC<AvatarProps> = ({ name }) => {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-purple-500 bg-purple-900 text-purple-100 flex items-center justify-center transition-all duration-300 hover:bg-purple-800">
      <span className="text-lg font-medium">{name[0].toUpperCase()}</span>
    </div>
  );
};


export const UserMenu: FC<UserMenuProps> = ({ username, isOpen, onToggle, onLogout }) => {
  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Avatar name={username} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 border border-gray-700">
          <button
            onClick={() => { onLogout(); onToggle(); }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
export const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const decodedToken = jwtDecode<MyToken>(token);
          setUsername(decodedToken.name);
        } catch (error) {
          console.error('Failed to decode token', error);
        }
      }
    }
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-purple-900 group-hover:bg-purple-800 transition-colors duration-200">
                <MapPin className="h-6 w-6 text-purple-100" />
              </div>
              <span className="text-2xl font-bold text-white">Mapping</span>
            </Link>
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <UserMenu
                username={username}
                isOpen={dropdownVisible}
                onToggle={() => setDropdownVisible(!dropdownVisible)}
                onLogout={handleLogout}
              />
            ) : (
              <Link
                to="/signin"
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};