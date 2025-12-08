"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/contexts/store-context";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useState } from "react";


function SettingsPageContent() {
    const { qrCodeUrl, setQrCodeUrl } = useStore();
    const { toast } = useToast();
    const [ newQrCodeUrl, setNewQrCodeUrl ] = useState(qrCodeUrl || "");

    const handleSave = () => {
        setQrCodeUrl(newQrCodeUrl);
        toast({ title: "Settings updated successfully!" });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Store Settings</CardTitle>
                    <CardDescription>Manage your store's general settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="qr-code-url">Payment QR Code URL</Label>
                        <Input 
                            id="qr-code-url"
                            value={newQrCodeUrl}
                            onChange={(e) => setNewQrCodeUrl(e.target.value)}
                            placeholder="https://example.com/qr-code.png"
                        />
                         <p className="text-sm text-muted-foreground">
                           Enter the URL for the payment QR code image. This will be displayed to customers at checkout.
                         </p>
                    </div>

                    {newQrCodeUrl && (
                        <div>
                            <Label>QR Code Preview</Label>
                            <div className="mt-2 relative w-48 h-48 border rounded-md p-2">
                                <Image src={newQrCodeUrl} alt="QR Code Preview" layout="fill" objectFit="contain" />
                            </div>
                        </div>
                    )}

                    <Button onClick={handleSave}>Save Settings</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default function SettingsPage() {
    return (
        <PrivateRoute>
            <SettingsPageContent />
        </PrivateRoute>
    );
}
