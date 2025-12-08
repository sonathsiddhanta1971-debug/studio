"use client";

import { PrivateRoute } from "@/components/private-route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useStore } from "@/contexts/store-context";
import { Edit, LogOut, MapPin, Package, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function ProfilePageContent() {
  const { user, logout, updateProfile } = useAuth();
  const { orders, addresses } = useStore();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  const handleProfileUpdate = async () => {
    if (displayName.trim() !== "" && user?.displayName !== displayName) {
      await updateProfile(displayName);
      toast({ title: "Profile updated successfully!" });
    }
    setIsEditing(false);
  };
  
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0] && user) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = async () => {
            const newPhotoURL = reader.result as string;
            await updateProfile(user.displayName || '', newPhotoURL);
            toast({ title: 'Profile picture updated!' });
        };
        reader.readAsDataURL(file);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
                <AvatarFallback><UserIcon /></AvatarFallback>
            </Avatar>
            <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer hover:bg-primary/90">
                <Edit className="h-4 w-4" />
                <input id="profile-pic" type="file" accept="image/*" className="hidden" onChange={handlePictureChange} />
            </label>
          </div>
          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="h-9" />
                <Button size="sm" onClick={handleProfileUpdate}>Save</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{user?.displayName}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}><Edit className="h-4 w-4" /></Button>
              </div>
            )}
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/orders">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Orders</CardTitle>
              <Package className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p>You have {orders.length} order(s).</p>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shipping Addresses</CardTitle>
            <MapPin className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p>You have {addresses.length} saved address(es).</p>
          </CardContent>
        </Card>
      </div>

      <Button variant="destructive" className="w-full md:w-auto" onClick={logout}>
        <LogOut className="mr-2 h-4 w-4" /> Log Out
      </Button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <PrivateRoute>
      <ProfilePageContent />
    </PrivateRoute>
  );
}
