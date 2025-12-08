"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-8 space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  return <>{children}</>;
}
