"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, X } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const { token } = useAuth();

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("100");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`${API_URL}/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Validasi
    if (name.trim().length < 3) {
      setErrorMsg("Nama produk minimal 3 karakter!");
      return;
    }
    if (description.trim().length < 10) {
      setErrorMsg("Deskripsi produk minimal 10 karakter!");
      return;
    }
    if (!category) {
      setErrorMsg("Silakan pilih kategori produk!");
      return;
    }
    if (parseInt(price) < 1000) {
      setErrorMsg("Harga produk minimal Rp 1.000!");
      return;
    }
    if (parseInt(stock) < 0) {
      setErrorMsg("Stok tidak boleh minus!");
      return;
    }
    if (file && file.name.toLowerCase().endsWith(".heic")) {
      setErrorMsg("Format gambar HEIC tidak didukung oleh browser. Tolong gunakan JPG atau PNG.");
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const uploadRes = await fetch(`${API_URL}/admin/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
        
        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error(errData.error || "Gagal mengupload gambar. Cek pengaturan Vercel.");
        }
        
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; 
      }

      const productPayload = {
        name,
        description,
        category,
        image: imageUrl,
        price: parseInt(price),
        stock: parseInt(stock),
        sizes: ["S", "M", "L"] 
      };

      const res = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(productPayload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create product");
      }

      setIsModalOpen(false);
      fetchProducts();
      
      // Reset form
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setStock("100");
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Error creating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = filterCategory === "All" ? products : products.filter(p => p.category === filterCategory);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl">Products</h1>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-none tracking-widest uppercase font-light">Add Product</Button>
      </div>

      <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
        {["All", "Dress", "Outerwear", "Skirt", "Blouse"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`text-xs tracking-widest uppercase font-light px-4 py-2 border ${
              filterCategory === cat ? "bg-foreground text-background border-foreground" : "bg-transparent text-foreground border-border/50 hover:border-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-background border border-border/50 overflow-x-auto">
        <table className="w-full text-left text-sm font-light">
          <thead className="bg-secondary/10 uppercase tracking-widest text-[10px] text-muted-foreground border-b border-border/50">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p: any) => (
              <tr key={p.id} className="border-b border-border/20 hover:bg-secondary/5">
                <td className="px-6 py-4 font-medium">{p.id}</td>
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4">Rp {p.price.toLocaleString("id-ID")}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border/50 p-8 w-full max-w-lg relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-heading text-2xl mb-6">Add New Product</h2>
            
            {errorMsg && (
              <div className="mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-sm font-light">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Name</label>
                <Input required value={name} onChange={e => setName(e.target.value)} className="rounded-none border-border/50 bg-secondary/20 h-10 font-light" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Description</label>
                <Input required value={description} onChange={e => setDescription(e.target.value)} className="rounded-none border-border/50 bg-secondary/20 h-10 font-light" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Category</label>
                  <select 
                    required 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="flex h-10 w-full rounded-none border border-border/50 bg-secondary/20 px-3 py-2 text-sm font-light ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Dress">Dress</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Skirt">Skirt</option>
                    <option value="Blouse">Blouse</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Stock</label>
                  <Input required type="number" value={stock} onChange={e => setStock(e.target.value)} className="rounded-none border-border/50 bg-secondary/20 h-10 font-light" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Price (Rp)</label>
                <Input required type="number" value={price} onChange={e => setPrice(e.target.value)} className="rounded-none border-border/50 bg-secondary/20 h-10 font-light" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-widest uppercase font-medium text-muted-foreground">Product Image</label>
                <Input required type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="rounded-none border-border/50 bg-secondary/20 h-10 font-light file:mr-4 file:py-1 file:px-4 file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer" />
              </div>
              
              <Button disabled={isSubmitting} type="submit" className="w-full mt-4 rounded-none uppercase tracking-widest font-light">
                {isSubmitting ? "Saving..." : "Save Product"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
