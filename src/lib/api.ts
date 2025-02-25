import { CategoryType, ProductType } from "@/types/myProduct";
import apiClient from "./axios";

export const categoryApi = {
  getAll: (name?: string) =>
    apiClient.get<CategoryType[]>("/categories", { params: { name } }),
  getById: (id: string) => apiClient.get<CategoryType>(`/categories/${id}`),
  create: (data: Omit<CategoryType, "id" | "products">) =>
    apiClient.post<CategoryType>("/categories", data),
  update: (id: string, data: Partial<CategoryType>) =>
    apiClient.put<CategoryType>(`/categories/${id}`, data),
  delete: (id: string) => apiClient.delete(`/categories/${id}`),
};

export const productApi = {
  getAll: (params: {
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    name?: string;
  }) => apiClient.get<ProductType[]>("/products", { params }),
  getById: (id: string) => apiClient.get<ProductType>(`/products/${id}`),
  create: (data: Omit<ProductType, "id" | "category">) =>
    apiClient.post<ProductType>("/products", data),
  update: (id: string, data: Partial<Omit<ProductType, "id" | "category">>) =>
    apiClient.put<ProductType>(`/products/${id}`, data),
  delete: (id: string) => apiClient.delete(`/products/${id}`),
};

export const cloudinaryApi = {
  delete: (publicId: string) => apiClient.post("/cloudinary", { publicId }),
};
