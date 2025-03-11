import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TokenContextProvider from './context/token-context';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A web application to track your tasks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <TokenContextProvider>
          <Navbar />
          <main>{children}</main>
        </TokenContextProvider>
      </body>
    </html>
  );
}
