"use client";

import { useAuth } from "@/components/auth/AuthContext";
import useSWR from "swr";
import { API_URL } from "@/lib/api";

export default function AdminOverview() {
  const { user, token } = useAuth();

  const fetchStats = async () => {
    const [ordersData, productsData] = await Promise.all([
      fetch(API_URL + "/admin/orders", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json()),
      fetch(API_URL + "/products").then(res => res.json())
    ]);

    const validOrders = Array.isArray(ordersData) ? ordersData : [];
    const validProducts = Array.isArray(productsData) ? productsData : (productsData.data || []);
    
    const rev = validOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    return {
      orders: validOrders.length,
      products: validProducts.length,
      revenue: rev
    };
  };

  const { data: stats, isLoading } = useSWR(
    token ? ["admin-stats", token] : null,
    fetchStats,
    { refreshInterval: 10000 } // refresh every 10s for admin
  );

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="font-heading text-3xl mb-8">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Total Orders</h3>
          {isLoading && !stats ? (
            <div className="h-10 w-20 bg-secondary/30 animate-pulse mt-1" />
          ) : (
            <p className="text-4xl font-light">{stats?.orders || 0}</p>
          )}
        </div>
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Total Revenue</h3>
          {isLoading && !stats ? (
            <div className="h-10 w-48 bg-secondary/30 animate-pulse mt-1" />
          ) : (
            <p className="text-4xl font-light">Rp {stats?.revenue?.toLocaleString('id-ID') || 0}</p>
          )}
        </div>
        <div className="bg-background p-6 border border-border/50 shadow-sm">
          <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground mb-2">Active Products</h3>
          {isLoading && !stats ? (
            <div className="h-10 w-20 bg-secondary/30 animate-pulse mt-1" />
          ) : (
            <p className="text-4xl font-light">{stats?.products || 0}</p>
          )}
        </div>
      </div>
    </div>
  );
}
