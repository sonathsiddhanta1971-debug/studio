"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useStore } from "@/contexts/store-context";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CartPageContent() {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, shippingCost, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-bold">Your Cart is Empty</h2>
        <p className="mt-2 text-muted-foreground">Add some beautiful sarees to your cart!</p>
        <Button asChild className="mt-6">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-4">
        {cart.map(item => (
          <Card key={item.id} className="flex items-center p-4">
            <div className="relative w-24 h-32 bg-muted rounded-md overflow-hidden">
                <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
            </div>
            <div className="flex-grow ml-4">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-muted-foreground">₹{item.product.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input type="number" value={item.quantity} readOnly className="h-8 w-12 text-center" />
                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Button size="icon" variant="ghost" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                <Trash2 className="h-5 w-5" />
            </Button>
          </Card>
        ))}
      </div>
      <div className="lg:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost > 0 ? `₹${shippingCost.toLocaleString()}` : "Free"}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}


export default function CartPage() {
    return (
        <PrivateRoute>
            <CartPageContent />
        </PrivateRoute>
    );
}
