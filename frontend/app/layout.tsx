import type { Metadata } from 'next';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
