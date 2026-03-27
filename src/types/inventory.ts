export type Category =
  | "Electronics"
  | "Textiles"
  | "Hardware"
  | "Packaging"
  | "Chemicals"
  | "Food & Beverage";

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  quantity: number;
  supplier: string;
  location: string;
  unit: string;
}

export interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface SearchResponse {
  data: InventoryItem[];
  total: number;
  filters_applied: Record<string, string>;
}

export interface ErrorResponse {
  error: string;
  code: string;
}

export type FilterState = {
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
};
