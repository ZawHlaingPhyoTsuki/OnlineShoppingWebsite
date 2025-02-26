import { Product } from "@/types/product";
import { Category } from "@/types/category";
import apiClient from "./axios";
import { pagination } from "@/types/pagination";

export const categoryApi = {
  getAll: (name?: string) =>
    apiClient.get<Category[]>("/categories", { params: { name } }),
  getById: (id: string) => apiClient.get<Category>(`/categories/${id}`),
  create: (data: Omit<Category, "id" | "products">) =>
    apiClient.post<Category>("/categories", data),
  update: (id: string, data: Partial<Category>) =>
    apiClient.put<Category>(`/categories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/categories/${id}`),
};

export const productApi = {
  getAll: (params: {
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    name?: string;
    page?: number;
    limit?: number;
  }) =>
    apiClient.get<{
      products: Product[];
      pagination: pagination;
    }>("/products", { params }),
  getById: (id: string) => apiClient.get<Product>(`/products/${id}`),
  create: (data: Omit<Product, "id" | "category">) =>
    apiClient.post<Product>("/products", data),
  update: (id: string, data: Partial<Omit<Product, "id" | "category">>) =>
    apiClient.put<Product>(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

export const cloudinaryApi = {
  delete: (publicId: string) => apiClient.post("/cloudinary", { publicId }),
};
