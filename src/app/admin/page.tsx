"use client";

import { PrivateRoute } from "@/components/private-route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useStore } from "@/contexts/store-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DollarSign, Package, ShoppingCart, Users, Image as ImageIcon, Shirt } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function AdminPageContent() {
  const { user } = useAuth();
  const { orders, products } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (user && user.email !== 'admin@example.com') {
      router.push('/');
    }
  }, [user, router]);
  
  if (!user || user.email !== 'admin@example.com') {
    return null;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = 1; // Mocked for now

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/products">
            <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Manage Products</CardTitle>
                    <Shirt className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <p>Add, edit, or delete saree products.</p>
                </CardContent>
            </Card>
        </Link>
        <Link href="/admin/banners">
            <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Manage Banners</CardTitle>
                    <ImageIcon className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                    <p>Update your homepage banners.</p>
                </CardContent>
            </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{order.address.fullName}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/orders/${order.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
