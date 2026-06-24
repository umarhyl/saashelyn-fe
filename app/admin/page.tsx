"use client";

import { useAuth } from "@/components/auth/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

export default function AdminOverview() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });

  useEffect(() => {
    if (!token) return;
    
    // Fetch basic stats
    Promise.all([
      fetch(API_URL + "/admin/orders", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(API_URL + "/products").then(res => res.json())
    ]).then(([ordersData, productsData]) => {
      const validOrders = Array.isArray(ordersData) ? ordersData : [];
      // Products might come as { data: [...] } due to pagination
      const validProducts = Array.isArray(productsData) ? productsData : (productsData.data || []);
      
      const rev = validOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      setStats({
        orders: validOrders.length,
        products: validProducts.length,
        revenue: rev
      });
    }).catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h1 className="font-heading text-3xl mb-8">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Total Orders</h3>
          <p className="text-4xl font-light">{stats.orders}</p>
        </div>
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Total Revenue</h3>
          <p className="text-4xl font-light">Rp {stats.revenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Active Products</h3>
          <p className="text-4xl font-light">{stats.products}</p>
        </div>
      </div>
    </div>
  );
}
