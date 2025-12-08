"use client";

import { PrivateRoute } from "@/components/private-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AdminPageContent() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.email !== 'admin@example.com') {
      router.push('/');
    }
  }, [user, router]);
  
  if (!user || user.email !== 'admin@example.com') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the admin panel. More features coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage() {
    return (
        <PrivateRoute>
            <AdminPageContent />
        </PrivateRoute>
    )
}
