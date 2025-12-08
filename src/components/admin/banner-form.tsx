
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStore } from "@/contexts/store-context";
import { useToast } from "@/hooks/use-toast";
import type { Banner } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(2, "Title is required."),
  imageUrl: z.string().url("Must be a valid URL."),
  imageHint: z.string().optional(),
});

type BannerFormValues = z.infer<typeof formSchema>;

interface BannerFormProps {
    banner?: Banner;
    onSave: () => void;
}

export function BannerForm({ banner, onSave }: BannerFormProps) {
  const { updateBanner } = useStore();
  const { toast } = useToast();

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: banner?.title || "",
      imageUrl: banner?.imageUrl || "",
      imageHint: banner?.imageHint || "",
    },
  });

  function onSubmit(values: BannerFormValues) {
    if (banner) {
      updateBanner({ ...banner, ...values });
      toast({ title: "Banner updated successfully!" });
    }
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Banner Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="imageHint" render={({ field }) => (
            <FormItem><FormLabel>Image Hint (for AI)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" className="w-full">Save Banner</Button>
      </form>
    </Form>
  );
}
