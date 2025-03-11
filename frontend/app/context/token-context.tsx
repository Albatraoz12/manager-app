'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Root = {
  user: User;
};

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type TokenContextType = {
  user: Root | null;
  setUser: React.Dispatch<React.SetStateAction<Root | null>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
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
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const userInfo = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/identify');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userInfo();
      if (data && Object.keys(data).length > 0) {
        setUser(data);
        console.log(data);
      } else {
        setErrorMsg('No user Found');
      }
    };

    fetchUserData();
  }, []);

  return (
    <TokenContext.Provider
      value={{
        user,
        setUser,
        errorMsg,
        setErrorMsg,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
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
