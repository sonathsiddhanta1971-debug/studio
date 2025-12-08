
"use client";

import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/contexts/store-context";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/product-form";
import type { Product } from "@/lib/types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

function ProductsAdminPageContent() {
  const { products, deleteProduct } = useStore();
  const { toast } = useToast();
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(undefined);
    setFormOpen(true);
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast({ title: "Product deleted successfully." });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products</CardTitle>
            <Button onClick={handleAdd}><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image src={product.imageUrl} alt={product.name} width={40} height={60} className="rounded-md object-cover" />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                              <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the product.
                                  </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                          </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm product={editingProduct} onSave={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ProductsAdminPage() {
    return (
        <PrivateRoute>
            <ProductsAdminPageContent />
        </PrivateRoute>
    )
}
