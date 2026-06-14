"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Category } from "@/types/product";

const CATEGORIES: Category[] = ["Dress", "Outerwear", "Skirt", "Blouse"];

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 mt-8">
          <h1 className="font-heading text-4xl md:text-5xl font-normal tracking-wide mb-4">
            The Collection
          </h1>
          <p className="font-light tracking-wide text-muted-foreground uppercase text-sm max-w-lg mx-auto">
            Discover our curated selection of premium modest fashion, designed for the modern elegant woman.
          </p>
        </div>

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
        <ProductGrid products={filteredProducts} />
        
      </div>
    </div>
  );
}
