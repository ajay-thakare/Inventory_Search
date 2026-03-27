import { Category } from "@/types/inventory";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CATEGORIES: Category[] = [
  "Electronics",
  "Textiles",
  "Hardware",
  "Packaging",
  "Chemicals",
  "Food & Beverage",
];

interface Props {
  category: string;
  minPrice: string;
  maxPrice: string;
  priceError: string | null;
  onCategoryChange: (val: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
}

export function Filters({
  category,
  minPrice,
  maxPrice,
  priceError,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Select
          value={category}
          onValueChange={(val) => {
            if (val !== null) onCategoryChange(val);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Price (₹)"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          className="w-36"
          min={0}
        />
        <Input
          type="number"
          placeholder="Max Price (₹)"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          className="w-36"
          min={0}
        />
      </div>

      {priceError && <p className="text-sm text-red-500">{priceError}</p>}
    </div>
  );
}
