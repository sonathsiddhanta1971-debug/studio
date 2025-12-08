"use client";

import { ProductCard } from "@/components/product-card";
import { PrivateRoute } from "@/components/private-route";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/store-context";
import { Heart } from "lucide-react";
import Link from "next/link";

function WishlistPageContent() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-bold">Your Wishlist is Empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything yet.</p>
        <Button asChild className="mt-6">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default function WishlistPage() {
    return (
        <PrivateRoute>
            <WishlistPageContent />
        </PrivateRoute>
    )
}
