// store.ts
import { create } from "zustand";

type FilterState = {
  currentPage: number;
  categoryId: string | null;
  checkedCategory: string | null;
  sortBy: string;
};

type ViewState = {
  productStyle: "grid" | "list";
  limit: number;
};

type ShopStore = {
  filterState: FilterState;
  viewState: ViewState;
  setCurrentPage: (page: number) => void;
  setCategoryId: (id: string | null) => void;
  setCheckedCategory: (id: string | null) => void;
  setSortBy: (value: string) => void;
  setProductStyle: (style: "grid" | "list") => void;
};

export const useShopStore = create<ShopStore>((set) => ({
  filterState: {
    currentPage: 1,
    categoryId: null,
    checkedCategory: null,
    sortBy: "latest",
  },
  viewState: {
    productStyle: "grid",
    limit: 9,
  },
  setCurrentPage: (page) =>
    set((state) => ({
      filterState: { ...state.filterState, currentPage: page },
    })),
  setCategoryId: (id) =>
    set((state) => ({
      filterState: { ...state.filterState, categoryId: id },
    })),
  setCheckedCategory: (id) =>
    set((state) => ({
      filterState: { ...state.filterState, checkedCategory: id },
    })),
  setSortBy: (value) =>
    set((state) => ({
      filterState: { ...state.filterState, sortBy: value },
    })),
  setProductStyle: (style) =>
    set((state) => ({
      viewState: { ...state.viewState, productStyle: style },
    })),
}));
