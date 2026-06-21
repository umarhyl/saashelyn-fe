"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { useAuth } from "@/components/auth/AuthContext";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const { token } = useAuth();

  const fetchOrders = async () => {
    if (!token) return;
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch(`${API_URL}/admin/orders/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl">Orders</h1>
      </div>

      <div className="bg-background border border-border/50 overflow-x-auto">
        <table className="w-full text-left text-sm font-light">
          <thead className="bg-secondary/10 uppercase tracking-widest text-[10px] text-muted-foreground border-b border-border/50">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-b border-border/20 hover:bg-secondary/5">
                <td className="px-6 py-4 font-medium">#{o.id}</td>
                <td className="px-6 py-4">
                  <div>{o.firstName} {o.lastName}</div>
                  <div className="text-xs text-muted-foreground">{o.city}</div>
                </td>
                <td className="px-6 py-4">Rp {o.totalAmount.toLocaleString("id-ID")}</td>
                <td className="px-6 py-4">
                  <select 
                    value={o.status} 
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="w-32 h-8 text-xs border border-border/50 bg-background px-2 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
