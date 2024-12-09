// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/redux/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie Information App',
  description: 'Explore the latest movies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-gray-100">
            <nav className="bg-blue-600 text-white p-4">
              <div className="container mx-auto">
                Movie Information App
                </div>
              </nav>
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}