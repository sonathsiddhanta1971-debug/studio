'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function AppHeader({ title, showBackButton = false }: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto h-16 flex items-center px-4">
        {showBackButton && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
        )}
        <h1 className="text-xl font-bold text-primary font-headline tracking-tight">
          {title}
        </h1>
      </div>
    </header>
  );
}
