import { inventory } from "@/data/data";
import { InventoryItem, SearchParams } from "@/types/inventory";

export function searchInventory(params: SearchParams): InventoryItem[] {
  let results = [...inventory];

  if (params.q && params.q.trim() !== "") {
    const query = params.q.trim().toLowerCase();
    results = results.filter((item) => item.name.toLowerCase().includes(query));
  }

  if (params.category && params.category.trim() !== "") {
    const cat = params.category.trim().toLowerCase();
    results = results.filter((item) => item.category.toLowerCase() === cat);
  }

  const min = params.minPrice ? parseFloat(params.minPrice) : null;
  const max = params.maxPrice ? parseFloat(params.maxPrice) : null;

  if (min !== null) {
    results = results.filter((item) => item.price >= min);
  }
  if (max !== null) {
    results = results.filter((item) => item.price >= max);
  }

  return results;
}

export function validatePriceParams(
  minPrice?: string,
  maxPrice?: string,
): string | null {
  const min = minPrice ? parseFloat(minPrice) : null;
  const max = maxPrice ? parseFloat(maxPrice) : null;

  if (maxPrice && isNaN(min!)) return "minPrice must be a valid number";
  if (maxPrice && isNaN(max!)) return "maxPrice must be a valid number";
  if (min !== null && min < 0) return "minPrice cannot be negative";
  if (max !== null && max < 0) return "maxPrice cannot be negative";
  if (min !== null && max !== null && min > max)
    return "minPrice cannot be greater than maxPrice";

  return null;
}
