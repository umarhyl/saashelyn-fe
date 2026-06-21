"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogOut, Package, User, CheckCircle2, Clock } from "lucide-react";
import { API_URL } from "@/lib/api";

type TabType = "orders" | "settings";

const settingsSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }).optional().or(z.literal("")),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional().or(z.literal("")),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function ProfilePage() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { name: "", password: "" }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    if (user) {
      reset({ name: user.name, password: "" });
    }
  }, [isAuthenticated, user, router, reset]);

  useEffect(() => {
    if (activeTab === "orders" && token) {
      fetchOrders();
    }
  }, [activeTab, token]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`${API_URL}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const onUpdateSettings = async (values: SettingsFormValues) => {
    setUpdateMessage("");
    setUpdateError("");
    
    try {
      const payload: any = {};
      if (values.name && values.name !== user?.name) payload.name = values.name;
      if (values.password) payload.password = values.password;
      
      if (Object.keys(payload).length === 0) {
        setUpdateMessage("No changes made.");
        return;
      }

      const res = await fetch(`${API_URL}/auth/me`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      
      setUpdateMessage("Profile updated successfully!");
      if (values.password) {
        reset({ name: payload.name || user?.name, password: "" });
      }
    } catch (err: any) {
      setUpdateError(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        
        <div className="mb-12">
          <h1 className="font-heading text-4xl mb-2">My Account</h1>
          <p className="text-muted-foreground font-light">Welcome back, {user.name}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 text-left transition-colors whitespace-nowrap ${
                  activeTab === "orders" 
                    ? "bg-secondary/20 text-foreground font-medium border-l-2 border-foreground" 
                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                <Package className="w-4 h-4" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 text-left transition-colors whitespace-nowrap ${
                  activeTab === "settings" 
                    ? "bg-secondary/20 text-foreground font-medium border-l-2 border-foreground" 
                    : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground border-l-2 border-transparent"
                }`}
              >
                <User className="w-4 h-4" />
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-red-500/10 transition-colors border-l-2 border-transparent mt-auto md:mt-8 whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="font-heading text-2xl mb-8 border-b border-border/50 pb-4">Order History</h2>
                
                {loadingOrders ? (
                  <p className="text-muted-foreground font-light">Loading your orders...</p>
                ) : orders.length === 0 ? (
                  <div className="bg-secondary/10 p-8 text-center border border-border/50">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground font-light mb-6">When you place an order, it will appear here.</p>
                    <Button onClick={() => router.push("/collection")} className="rounded-none tracking-widest uppercase font-light">
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border/50 bg-secondary/5 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-border/50 pb-4">
                          <div>
                            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">Order #{order.id}</p>
                            <p className="font-light">{new Date(order.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-background border border-border/50">
                            {order.status === "Pending" ? (
                              <Clock className="w-3 h-3 text-yellow-600" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 text-green-600" />
                            )}
                            <span className="text-xs uppercase tracking-wider font-medium">{order.status}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {order.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-sm font-light">
                              <div className="flex items-center gap-4">
                                <span className="text-muted-foreground">{item.quantity}x</span>
                                <span>Product ID: {item.productId} <span className="text-muted-foreground text-xs ml-2">({item.size})</span></span>
                              </div>
                              <span>Rp {item.price.toLocaleString("id-ID")}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                          <span className="text-sm tracking-widest uppercase text-muted-foreground">Total</span>
                          <span className="font-medium text-lg">Rp {order.totalAmount.toLocaleString("id-ID")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="animate-in fade-in duration-300 max-w-lg">
                <h2 className="font-heading text-2xl mb-8 border-b border-border/50 pb-4">Account Settings</h2>
                
                {updateMessage && <p className="text-green-600 text-sm mb-6 bg-green-500/10 p-3">{updateMessage}</p>}
                {updateError && <p className="text-red-500 text-sm mb-6 bg-red-500/10 p-3">{updateError}</p>}

                <form onSubmit={handleSubmit(onUpdateSettings)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Email</label>
                    <Input 
                      disabled
                      value={user.email}
                      className="rounded-none border-border/50 bg-secondary/10 h-12 font-light text-muted-foreground cursor-not-allowed" 
                    />
                    <p className="text-[10px] text-muted-foreground">Email cannot be changed.</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Full Name</label>
                    <Input 
                      {...register("name")}
                      className={`rounded-none border-border/50 bg-background h-12 font-light ${errors.name ? "border-red-500" : ""}`} 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">New Password</label>
                    <Input 
                      {...register("password")}
                      type="password"
                      placeholder="Leave blank to keep current password"
                      className={`rounded-none border-border/50 bg-background h-12 font-light ${errors.password ? "border-red-500" : ""}`} 
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>

                  <Button disabled={isSubmitting} type="submit" className="rounded-none uppercase tracking-widest font-light h-12 px-8">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </div>
            )}
            
          </main>
        </div>
      </div>
    </div>
  );
}
