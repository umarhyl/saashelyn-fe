"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

  if (isLoading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center pt-24"><p>Loading...</p></div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-secondary/5 flex">
      <aside className="w-64 bg-background border-r border-border/50 hidden md:block fixed h-full top-0 pt-24">
        <div className="p-6">
          <h2 className="font-heading text-xl uppercase tracking-widest mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 text-sm tracking-widest uppercase transition-colors ${pathname === '/admin' ? 'bg-secondary/20 font-medium' : 'hover:bg-secondary/10 font-light'}`}>
              <LayoutDashboard className="w-4 h-4" /> Overview
            </Link>
            <Link href="/admin/products" className={`flex items-center gap-3 px-4 py-3 text-sm tracking-widest uppercase transition-colors ${pathname === '/admin/products' ? 'bg-secondary/20 font-medium' : 'hover:bg-secondary/10 font-light'}`}>
              <ShoppingBag className="w-4 h-4" /> Products
            </Link>
            <Link href="/admin/orders" className={`flex items-center gap-3 px-4 py-3 text-sm tracking-widest uppercase transition-colors ${pathname === '/admin/orders' ? 'bg-secondary/20 font-medium' : 'hover:bg-secondary/10 font-light'}`}>
              <Package className="w-4 h-4" /> Orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
