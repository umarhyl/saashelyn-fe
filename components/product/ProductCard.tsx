"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    // Default to the first size available
    const defaultSize = product.sizes.length > 0 ? product.sizes[0] : "All Size";
    addItem(product, defaultSize, 1);
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div 
        className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted/30 rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Quick Add overlay */}
        <div 
          className={`absolute bottom-0 left-0 w-full p-4 transition-all duration-300 ease-in-out ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <Button 
            onClick={handleQuickAdd}
            className="w-full bg-background/90 text-foreground hover:bg-background backdrop-blur-sm rounded-none uppercase tracking-widest text-xs font-light"
          >
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col text-center">
        <h3 className="font-medium text-sm tracking-widest uppercase mb-1">{product.name}</h3>
        <p className="text-muted-foreground font-light text-sm">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </div>
    </Link>
  );
}
