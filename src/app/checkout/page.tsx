"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/contexts/store-context";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Address } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddressForm } from "@/components/address-form";

function CheckoutPageContent() {
  const router = useRouter();
  const { cart, cartSubtotal, shippingCost, cartTotal, addresses, placeOrder } = useStore();
  const { toast } = useToast();
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isAddressDialogOpen, setAddressDialogOpen] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.replace('/');
    }
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [cart, addresses, router]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast({ variant: 'destructive', title: "Please select a shipping address." });
      return;
    }
    setIsPlacingOrder(true);
    try {
      const orderId = await placeOrder(selectedAddress, paymentMethod);
      toast({ title: "Order Placed Successfully!", description: `Your order ID is ${orderId}` });
      router.push(`/orders/${orderId}`);
    } catch (error) {
      toast({ variant: 'destructive', title: "Failed to place order.", description: "Please try again." });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAddress?.id} onValueChange={(id) => setSelectedAddress(addresses.find(a => a.id === id) || null)}>
              <div className="space-y-4">
                {addresses.map(address => (
                  <Label key={address.id} htmlFor={address.id} className="flex items-start gap-4 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <div>
                      <p className="font-semibold">{address.fullName}</p>
                      <p className="text-sm text-muted-foreground">{address.addressLine}, {address.city}, {address.state} - {address.pincode}</p>
                      <p className="text-sm text-muted-foreground">Mobile: {address.mobileNumber}</p>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
            <Dialog open={isAddressDialogOpen} onOpenChange={setAddressDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Address</DialogTitle></DialogHeader>
                <AddressForm onSave={() => setAddressDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
             <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
                <Label htmlFor="razorpay" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary">
                  <RadioGroupItem value="Razorpay" id="razorpay" />
                  <span>Online Payment (Razorpay)</span>
                </Label>
                <Label htmlFor="cod" className="flex items-center gap-4 border rounded-lg p-4 cursor-pointer has-[:checked]:border-primary">
                  <RadioGroupItem value="COD" id="cod" />
                  <span>Cash on Delivery</span>
                </Label>
             </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 sticky top-20">
        <Card>
            <CardHeader><CardTitle>Your Order</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <div className="relative w-16 h-20 bg-muted rounded-md overflow-hidden">
                                <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-medium truncate">{item.product.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <Separator className="my-4"/>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{cartSubtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span>Shipping</span><span>{shippingCost > 0 ? `₹${shippingCost.toLocaleString()}` : "Free"}</span></div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base"><span>Total</span><span>₹{cartTotal.toLocaleString()}</span></div>
                </div>
                 <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder} disabled={isPlacingOrder}>
                    {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isPlacingOrder ? 'Placing Order...' : `Place Order (${paymentMethod})`}
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
    return (
        <PrivateRoute>
            <CheckoutPageContent />
        </PrivateRoute>
    )
}
