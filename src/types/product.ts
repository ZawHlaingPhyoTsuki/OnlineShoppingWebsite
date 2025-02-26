import { Category } from "./category";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  categoryId?: string | null;
  category?: Category | null;
  images: string[];
  color: string[];
  size: string[];
};
