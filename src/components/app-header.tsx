
'use client';

import { ArrowLeft, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}

export function AppHeader({ title, showBackButton = false, showSearch = false, onSearch }: AppHeaderProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto h-16 flex items-center px-4 justify-between">
        <div className="flex items-center">
            {showBackButton && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            )}
            <h1 className={cn(
                "text-xl font-bold text-primary font-headline tracking-tight transition-all duration-300",
                isSearchOpen && "opacity-0 -translate-x-4"
                )}>
            {title}
            </h1>
        </div>

        {showSearch && (
            <div className="flex items-center justify-end flex-1">
                 <div className={cn(
                    "absolute right-4 w-full max-w-xs transition-all duration-300 ease-in-out",
                    isSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                )}>
                    <Input 
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pr-10"
                    />
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                            if(onSearch) onSearch('');
                        }}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                        "transition-opacity",
                        isSearchOpen ? "opacity-0" : "opacity-100"
                    )}
                >
                    <Search />
                </Button>
            </div>
        )}
      </div>
    </header>
  );
}
