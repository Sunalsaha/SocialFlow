import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const validUsers = [
  { email: 'demo@example.com', password: 'password' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    const match = validUsers.find(
      (user) =>
        user.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        user.password === password.trim()
    );

    if (match) {
      setIsAuthenticated(true);
      // Store user info or token
      localStorage.setItem(
        'authUser',
        JSON.stringify({ email: match.email })
      );
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem('authUser');
      throw new Error('Invalid credentials');
    }

    setIsLoading(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
  };

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.email) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
