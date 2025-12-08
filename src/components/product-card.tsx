"use client";

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useStore } from '@/contexts/store-context';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isWishlisted, toggleWishlist, addToCart } = useStore();
  const { toast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart!',
      description: `${product.name} is now in your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: wishlisted ? 'Removed from wishlist' : 'Added to wishlist!',
    });
  }

  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.imageHint}
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 rounded-full h-8 w-8 bg-white/70 hover:bg-white"
            onClick={handleToggleWishlist}
          >
            <Heart className={cn("w-4 h-4", wishlisted ? 'text-red-500 fill-current' : 'text-gray-500')} />
          </Button>
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-sm truncate">{product.name}</h3>
          <div className="flex items-center gap-2">
            <p className="font-bold text-base">₹{product.price.toLocaleString()}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
