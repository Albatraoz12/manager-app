'use client';
import { createContext, useState } from 'react';

const TokenContext = createContext(null);

export default function TokenContextProvider({ children }: any) {
  const [token, setToken] = useState('');
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
