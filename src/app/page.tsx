
"use client";

import { BannerCarousel } from "@/components/banner-carousel";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/contexts/store-context";
import { BANNERS, CATEGORIES } from "@/lib/mock-data";
import { useState } from "react";
import { AppHeader } from "@/components/app-header";

export default function Home() {
  const { products, loading } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProductsByCategory = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const filteredProducts = filteredProductsByCategory.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <AppHeader title="MITA SHAREE" showSearch={true} onSearch={setSearchQuery} />
      <BannerCarousel banners={BANNERS} />

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-headline mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'secondary'}
              onClick={() => setSelectedCategory('all')}
              className="cursor-pointer text-base px-4 py-1"
            >
              All
            </Badge>
          {CATEGORIES.map(category => (
            <Badge 
              key={category.id} 
              variant={selectedCategory === category.id ? 'default' : 'secondary'}
              onClick={() => setSelectedCategory(category.id)}
              className="cursor-pointer text-base px-4 py-1"
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-headline mb-4">Our Products</h2>
        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
         {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">No products found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
