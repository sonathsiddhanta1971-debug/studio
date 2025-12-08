"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/contexts/store-context";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function OrdersPageContent() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-bold">No Orders Yet</h2>
        <p className="mt-2 text-muted-foreground">You haven't placed any orders with us.</p>
        <Button asChild className="mt-6">
          <Link href="/">Shop Now</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {orders.map(order => (
        <Card key={order.id}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                        <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                        <p className="text-sm capitalize text-primary">{order.status}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    {order.items.slice(0, 4).map(item => (
                        <div key={item.id} className="relative h-16 w-12 rounded-md overflow-hidden border">
                            <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                        </div>
                    ))}
                    {order.items.length > 4 && 
                        <div className="h-16 w-12 rounded-md bg-muted flex items-center justify-center text-sm font-semibold">+{order.items.length - 4}</div>
                    }
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link href={`/orders/${order.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function OrdersPage() {
    return (
        <PrivateRoute>
            <OrdersPageContent />
        </PrivateRoute>
    )
}
