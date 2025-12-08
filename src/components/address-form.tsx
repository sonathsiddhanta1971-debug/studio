"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useStore } from "@/contexts/store-context";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  mobileNumber: z.string().length(10, "Must be a 10-digit mobile number."),
  pincode: z.string().length(6, "Must be a 6-digit pincode."),
  addressLine: z.string().min(5, "Address line is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
});

type AddressFormValues = z.infer<typeof formSchema>;

export function AddressForm({ onSave }: { onSave: () => void }) {
  const { addAddress } = useStore();
  const { toast } = useToast();
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", mobileNumber: "", pincode: "", addressLine: "", city: "", state: "",
    },
  });

  const pincode = form.watch("pincode");

  const fetchPincodeData = useCallback(async (pincodeToFetch: string) => {
    if (pincodeToFetch.length !== 6) return;
    setIsFetchingPincode(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincodeToFetch}`);
      const data = await response.json();
      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        form.setValue("city", postOffice.District, { shouldValidate: true });
        form.setValue("state", postOffice.State, { shouldValidate: true });
        toast({ title: "City and State auto-filled." });
      } else {
        toast({ variant: 'destructive', title: "Invalid Pincode" });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: "Error fetching pincode data." });
    } finally {
      setIsFetchingPincode(false);
    }
  }, [form, toast]);

  useEffect(() => {
    const debouncedFetch = setTimeout(() => {
      fetchPincodeData(pincode);
    }, 500);
    return () => clearTimeout(debouncedFetch);
  }, [pincode, fetchPincodeData]);


  function onSubmit(values: AddressFormValues) {
    addAddress(values);
    toast({ title: "Address saved successfully!" });
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem className="col-span-2"><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="pincode" render={({ field }) => (
                <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input type="number" {...field} />
                            {isFetchingPincode && <Loader2 className="absolute right-2 top-2 h-4 w-4 animate-spin" />}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
        <FormField control={form.control} name="addressLine" render={({ field }) => (
            <FormItem><FormLabel>Address (House No, Building, Street, Area)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem><FormLabel>City/District/Town</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        <Button type="submit" className="w-full">Save Address</Button>
      </form>
    </Form>
  );
}
