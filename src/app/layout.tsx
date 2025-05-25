import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AI } from '@/app/(app)/actions';

export const metadata: Metadata = {
  title: 'Lean Factory',
  description: 'End-to-End Manufacturing & Inventory Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <AI>
          {children}
        </AI>
        <Toaster />
      </body>
    </html>
  );
}
