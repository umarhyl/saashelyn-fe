export const API_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://localhost:8080/api";

export async function fetchProducts(page = 1, limit = 12, category = "") {
  let url = `${API_URL}/products?page=${page}&limit=${limit}`;
  if (category) url += `&category=${category}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data || [];
}

export async function fetchProduct(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
