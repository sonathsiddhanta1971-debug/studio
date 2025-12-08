
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStore } from "@/contexts/store-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name is required."),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be positive."),
  originalPrice: z.coerce.number().optional(),
  imageUrl: z.string().url("Must be a valid URL."),
  imageHint: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    product?: Product;
    onSave: () => void;
}

export function ProductForm({ product, onSave }: ProductFormProps) {
  const { addProduct, updateProduct, categories } = useStore();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      category: product?.category || "",
      price: product?.price || 0,
      originalPrice: product?.originalPrice,
      imageUrl: product?.imageUrl || "",
      imageHint: product?.imageHint || "",
    },
  });

  function onSubmit(values: ProductFormValues) {
    if (product) {
      updateProduct({ ...product, ...values });
      toast({ title: "Product updated successfully!" });
    } else {
      addProduct(values);
      toast({ title: "Product added successfully!" });
    }
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Price (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField control={form.control} name="originalPrice" render={({ field }) => (
                <FormItem><FormLabel>Original Price (₹) (Optional)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>

        <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <FormField control={form.control} name="imageHint" render={({ field }) => (
            <FormItem><FormLabel>Image Hint (for AI)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        
        <Button type="submit" className="w-full">Save Product</Button>
      </form>
    </Form>
  );
}
