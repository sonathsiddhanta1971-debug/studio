"use client";

import type { User } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, photoURL?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mock checking for a logged-in user session
    const storedUser = localStorage.getItem('mita-sharee-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      uid: 'mock-uid-123',
      email: email,
      displayName: 'Test User',
      photoURL: 'https://picsum.photos/seed/user/100/100',
    };
    setUser(mockUser);
    localStorage.setItem('mita-sharee-user', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/');
  };

  const signup = async (name: string, email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      uid: 'mock-uid-123',
      email: email,
      displayName: name,
      photoURL: 'https://picsum.photos/seed/user/100/100',
    };
    setUser(mockUser);
    localStorage.setItem('mita-sharee-user', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mita-sharee-user');
    router.push('/login');
  };

  const updateProfile = async (name: string, photoURL?: string) => {
    if (user) {
        const updatedUser = {
            ...user,
            displayName: name,
            photoURL: photoURL || user.photoURL
        };
        setUser(updatedUser);
        localStorage.setItem('mita-sharee-user', JSON.stringify(updatedUser));
    }
  }

  const value = { user, loading, login, signup, logout, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
