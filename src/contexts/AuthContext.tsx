
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple mock validation
      if (email === 'demo@example.com' && password === 'password') {
        console.log('Login successful');
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        console.log('Login failed: Invalid credentials');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out');
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('isAuthenticated');
    console.log('Checking stored auth:', stored);
    if (stored === 'true') {
      console.log('Found existing session, setting authenticated');
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  console.log('Auth state:', { isAuthenticated, isLoading });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
