import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
    });
  };

  const loginWithGoogle = async () => {
    // Mock Google login
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '2',
      name: 'Google User',
      email: 'user@gmail.com',
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({
      id: '3',
      name: name,
      email: email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
