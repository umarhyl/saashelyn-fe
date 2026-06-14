"use client";

import { useCart } from "@/components/cart/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-border/50">
          <SheetTitle className="font-heading text-2xl font-normal tracking-wide">
            Shopping Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
              <p className="text-muted-foreground font-light text-lg">Your cart is empty</p>
              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)}
                className="font-light tracking-wider"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  <div className="relative w-20 h-28 bg-muted/50 overflow-hidden rounded-sm">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm tracking-wide uppercase leading-tight pr-4">
                          {item.product.name}
                        </h4>
                        <button 
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 font-light">Size: {item.size}</p>
                      <p className="text-sm mt-1">
                        Rp {item.product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-border rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-1 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-1 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <span className="font-light tracking-wide uppercase text-sm">Subtotal</span>
              <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <Separator className="mb-4" />
            <p className="text-xs text-muted-foreground text-center mb-4 font-light">
              Shipping & taxes calculated at checkout
            </p>
            <Link href="/cart" onClick={() => setIsCartOpen(false)}>
              <Button className="w-full tracking-widest font-light rounded-none h-12 uppercase">
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
