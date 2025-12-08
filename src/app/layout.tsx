import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { MainAppShell } from '@/components/main-app-shell';

export const metadata: Metadata = {
  title: 'MITA SHAREE',
  description: 'Your one-stop shop for beautiful sarees.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <MainAppShell>
            {children}
          </MainAppShell>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
