import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import AuthContextProvider from '@/components/AuthProvider';
import WebsocketProvider from '@/components/WebsocketProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Next Go Chat',
  description: 'A chat web application using Nextjs and golang.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <AuthContextProvider>
      <WebsocketProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </WebsocketProvider>
    </AuthContextProvider>
  );
}
