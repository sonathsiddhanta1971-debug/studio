"use client";

import { PrivateRoute } from "@/components/private-route";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/contexts/store-context";
import Image from "next/image";

function OrderDetailPageContent({ orderId }: { orderId: string }) {
  const { orders, loading } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 space-y-4"><Skeleton className="h-96 w-full" /></div>;
  }
  
  if (!order) {
    return <div className="container mx-auto px-4 py-16 text-center">Order not found.</div>;
  }
  
  const subtotal = order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = order.total - subtotal;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                        <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">{order.status}</Badge>
                </div>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
                <Card>
                    <CardHeader><CardTitle>Items in this order</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="relative w-20 h-24 bg-muted rounded-md overflow-hidden">
                                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6 lg:sticky top-20">
                <Card>
                    <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                        <div className="flex justify-between text-sm"><span>Shipping</span><span>₹{shipping.toLocaleString()}</span></div>
                        <Separator />
                        <div className="flex justify-between font-bold"><span>Total</span><span>₹{order.total.toLocaleString()}</span></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Shipping Address</CardTitle></CardHeader>
                    <CardContent className="text-sm">
                        <p className="font-semibold">{order.address.fullName}</p>
                        <p>{order.address.addressLine}</p>
                        <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                        <p>Mobile: {order.address.mobileNumber}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}


export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
    return (
        <PrivateRoute>
            <OrderDetailPageContent orderId={params.orderId} />
        </PrivateRoute>
    );
}
