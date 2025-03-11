'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type Root = {
  user: User;
};

type TokenContextType = {
  user: Root | null;
  setUser: React.Dispatch<React.SetStateAction<Root | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TokenContext = createContext<TokenContextType | null>(null);

export default function TokenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Root | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch('/api/auth/identify', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkUserStatus();
  }, [isLoggedIn]);

  return (
    <TokenContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokenContext(): TokenContextType {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('TokenContext should be used within TokenContextProvider');
  }
  return context;
}
