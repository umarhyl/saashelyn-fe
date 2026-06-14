export type Category = "Dress" | "Outerwear" | "Skirt" | "Blouse";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  image: string;
  price: number;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
