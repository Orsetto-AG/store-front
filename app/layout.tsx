import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import MobileNavBar from '@/components/MobileNavBar';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orsetto - eifach bärig guet!',
  description: 'Your trusted Swiss marketplace for buying and selling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gray-50 pb-16 md:pb-0">{children}</main>
          <MobileNavBar />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}