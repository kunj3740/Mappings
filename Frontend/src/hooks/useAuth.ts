import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('token');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/signin');
  }, [navigate]);

  return {
    isAuthenticated: isAuthenticated(),
    logout,
  };
}