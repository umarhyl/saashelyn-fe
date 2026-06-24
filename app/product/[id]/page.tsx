"use client";

import { use, useState } from "react";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  
  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        // Fetch all products for related
        fetch(`${API_URL}/products`)
          .then(r => r.json())
          .then(all => {
            setRelatedProducts(all.filter((p: any) => p.category === data.category && p.id !== data.id).slice(0, 4));
          });
      })
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;
  if (!product) return notFound();

  const handleAddToCart = () => {
    addItem(product, selectedSize, 1);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-xs tracking-widest uppercase font-light text-muted-foreground mb-8 mt-4">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-foreground">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-24">
          {/* Images */}
          <FadeIn direction="right" className="w-full md:w-1/2">
            <div className="relative aspect-[3/4] bg-muted/30 rounded-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn direction="left" className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="font-heading text-3xl md:text-4xl font-normal mb-4">{product.name}</h1>
            <p className="text-xl font-light mb-8">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <div className="mb-8">
              <p className="text-muted-foreground font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm tracking-widest uppercase font-medium">Size</span>
                <button className="text-xs tracking-wide uppercase font-light text-muted-foreground hover:text-foreground underline underline-offset-4">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border text-sm font-light uppercase tracking-wider transition-all duration-300 ${
                      selectedSize === size 
                        ? "border-foreground bg-foreground text-background" 
                        : "border-border hover:border-foreground/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="w-full h-14 rounded-none uppercase tracking-widest font-light"
              >
                Add to Cart
              </Button>
            </div>

            {/* Accordions */}
            <Accordion className="w-full">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="text-sm tracking-widest uppercase font-normal py-4">
                  Details & Care
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pt-2 pb-6">
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Premium blended fabric</li>
                    <li>Dry clean only recommended</li>
                    <li>Do not bleach or tumble dry</li>
                    <li>Cool iron if needed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="text-sm tracking-widest uppercase font-normal py-4">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pt-2 pb-6">
                  Complimentary shipping on orders over Rp 2.000.000. Returns are accepted within 14 days of delivery. Items must be unworn with original tags attached.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FadeIn>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <FadeIn direction="up" className="border-t border-border/50 pt-24">
            <h2 className="font-heading text-3xl font-normal text-center mb-16">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </FadeIn>
        )}
      </div>
    </div>
  );
}
