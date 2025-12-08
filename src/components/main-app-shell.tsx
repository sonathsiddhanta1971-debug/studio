"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { BottomNav } from './bottom-nav';
import { AppHeader } from './app-header';

const NO_SHELL_ROUTES = ['/login', '/signup'];
const MAIN_NAV_ROUTES = ['/', '/wishlist', '/cart', '/profile'];

export function MainAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (NO_SHELL_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  const showBottomNav = MAIN_NAV_ROUTES.includes(pathname);
  
  let headerTitle = "MITA SHAREE";
  if (pathname === '/wishlist') headerTitle = "My Wishlist";
  else if (pathname === '/cart') headerTitle = "Shopping Cart";
  else if (pathname === '/profile') headerTitle = "My Profile";
  else if (pathname === '/checkout') headerTitle = "Checkout";
  else if (pathname.startsWith('/orders')) headerTitle = "My Orders";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader title={headerTitle} showBackButton={!showBottomNav} />
      <main className={`flex-grow ${showBottomNav ? 'pb-20' : 'pb-4'} pt-16`}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
