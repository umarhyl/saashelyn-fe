"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { FadeIn } from "@/components/ui/FadeIn";
import useSWR from "swr";

const CATEGORIES: Category[] = ["Dress", "Outerwear", "Skirt", "Blouse"];

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.data || []);
  
  const { data: cachedProducts, error } = useSWR(
    `${API_URL}/products?page=${page}&limit=8${selectedCategory !== "All" ? `&category=${selectedCategory}` : ""}`,
    fetcher
  );

  useEffect(() => {
    if (cachedProducts) {
      if (page === 1) {
        setProducts(cachedProducts);
      } else {
        setProducts(prev => {
          // Prevent duplicates when appending
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = cachedProducts.filter((p: any) => !existingIds.has(p.id));
          return [...prev, ...newUnique];
        });
      }
      setHasMore(cachedProducts.length >= 8);
    }
  }, [cachedProducts, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <FadeIn direction="up">
          <div className="text-center mb-16 mt-8">
            <h1 className="font-heading text-4xl md:text-5xl font-normal tracking-wide mb-4">
              The Collection
            </h1>
            <p className="font-light tracking-wide text-muted-foreground uppercase text-sm max-w-lg mx-auto">
              Discover our curated selection of premium modest fashion, designed for the modern elegant woman.
            </p>
          </div>
        </FadeIn>

        {/* Filters */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-4 md:gap-8 min-w-max px-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`text-sm tracking-widest uppercase font-light pb-1 transition-colors border-b border-transparent ${
                selectedCategory === "All" ? "text-foreground font-medium border-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm tracking-widest uppercase font-light pb-1 transition-colors border-b border-transparent ${
                  selectedCategory === category ? "text-foreground font-medium border-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <FadeIn delay={0.2}>
          <ProductGrid products={products} />
        </FadeIn>
        
        {/* Load More */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <Button onClick={loadMore} variant="outline" className="rounded-none tracking-widest uppercase font-light h-12 px-8">
              Load More
            </Button>
          </div>
        )}
        
      </div>
    </div>
  );
}
