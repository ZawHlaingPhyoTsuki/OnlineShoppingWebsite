export interface CategoryType {
  id: string;
  name: string;
  description?: string | null;
  products?: ProductType[];
}
// export interface CategoryType {
//   id: string;
//   name: string;
//   description?: string | null;
//   image: string;
//   products?: ProductType[];
// }

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId?: string | null;
  category?: CategoryType | null;
  images: string[];
  color: string[];
  size: string[];
}

// export interface ProductType {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   discountedPrice: number;
//   categoryId?: string | null;
//   category?: CategoryType | null;
//   images: string[];
//   color: string[];
//   size: string[];
// }
