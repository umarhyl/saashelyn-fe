"use client";

import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "@/lib/api";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { isAuthenticated, token, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const router = useRouter();
  const shippingCost = items.length > 0 ? 50000 : 0;
  const total = subtotal + shippingCost;

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", address: "", city: "", postalCode: "", shipping: "Signature Express"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(API_URL + "/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: total,
          items: items.map(i => ({
            productId: i.product.id,
            size: i.size,
            quantity: i.quantity,
            price: i.product.price
          }))
        })
      });
      if (!res.ok) throw new Error("Checkout failed");
      const resData = await res.json();
      
      clearCart();
      router.push(`/payment/${resData.orderId}`);
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <h1 className="font-heading text-3xl md:text-4xl font-normal mb-12">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-border/50 bg-secondary/10">
            <h2 className="font-heading text-2xl mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground font-light mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/collection">
              <Button size="lg" className="rounded-none font-light tracking-widest uppercase">
                Explore Collection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Checkout Form */}
            <div className="w-full lg:w-3/5 order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Shipping Address */}
                <div>
                  <h3 className="font-heading text-xl mb-6">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">First Name</label>
                      <Input value={formData.firstName} onChange={e=>setFormData({...formData, firstName: e.target.value})} required placeholder="e.g. Natalia" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Last Name</label>
                      <Input value={formData.lastName} onChange={e=>setFormData({...formData, lastName: e.target.value})} required placeholder="e.g. Sherliz" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light" />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Street Address</label>
                      <Input value={formData.address} onChange={e=>setFormData({...formData, address: e.target.value})} required placeholder="1234 Jl. Dr Angka" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">City</label>
                      <Input value={formData.city} onChange={e=>setFormData({...formData, city: e.target.value})} required placeholder="Surabaya" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Postal Code</label>
                      <Input value={formData.postalCode} onChange={e=>setFormData({...formData, postalCode: e.target.value})} required placeholder="55018" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light" />
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Shipping Method */}
                <div>
                  <h3 className="font-heading text-xl mb-6">Shipping Method</h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-foreground/20 cursor-pointer bg-background">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="shipping" className="w-4 h-4 accent-primary" defaultChecked />
                        <div>
                          <p className="font-medium text-sm tracking-wide uppercase">Signature Express</p>
                          <p className="text-xs text-muted-foreground font-light">2-3 Business Days</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">Rp 50.000</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-border/50 cursor-pointer bg-secondary/10">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="shipping" className="w-4 h-4 accent-primary" />
                        <div>
                          <p className="font-medium text-sm tracking-wide uppercase">Atelier Complimentary</p>
                          <p className="text-xs text-muted-foreground font-light">5-7 Business Days</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">FREE</span>
                    </label>
                  </div>
                </div>

                <Separator className="bg-border/50" />

                {/* Payment Details */}
                <div>
                  <h3 className="font-heading text-xl mb-6">Payment Details</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light tracking-widest" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Expiry Date</label>
                        <Input placeholder="MM / YY" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light tracking-widest" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">CVC</label>
                        <Input placeholder="000" className="rounded-none border-border/50 bg-secondary/20 h-12 font-light tracking-widest" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full rounded-none h-14 uppercase tracking-widest font-light" 
                  type="submit"
                  disabled={isAdmin}
                >
                  {isAdmin ? "Admins Cannot Checkout" : (isAuthenticated ? "Complete Purchase" : "Sign In to Complete Purchase")}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-2/5 order-1 lg:order-2">
              <div className="bg-secondary/20 p-8">
                <h3 className="font-heading text-xl mb-8">Order Summary</h3>
                
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 h-24 bg-muted/50 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium text-xs tracking-widest uppercase leading-tight pr-4">
                              {item.product.name}
                            </h4>
                            <button 
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                            Size: {item.size}
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-border/50 bg-background/50">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-xs font-medium">
                            Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border/50 mb-6" />
                
                <div className="space-y-4 mb-6 text-sm font-light">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Shipping</span>
                    <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <Separator className="bg-border/50 mb-6" />
                
                <div className="flex justify-between items-center mb-8">
                  <span className="font-heading text-lg">TOTAL</span>
                  <span className="font-medium text-lg">Rp {total.toLocaleString("id-ID")}</span>
                </div>

                <div className="text-center text-xs text-muted-foreground font-light flex items-center justify-center gap-2">
                  <span>🔒 Secure SSL Encrypted Payment</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
