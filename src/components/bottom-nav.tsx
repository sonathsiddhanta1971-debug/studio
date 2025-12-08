"use client";

import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useStore } from '@/contexts/store-context';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/wishlist', icon: Heart, label: 'Wishlist' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { cart, wishlist } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-40">
      <div className="container mx-auto flex justify-around h-16 items-center max-w-md">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label} className="flex-1">
              <div className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}>
                <div className="relative">
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {item.href === '/cart' && cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                  {item.href === '/wishlist' && wishlist.length > 0 && (
                     <span className="absolute -top-1 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
