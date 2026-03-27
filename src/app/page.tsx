"use client";

import { validatePriceParams } from "@/lib/search";
import { FilterState, InventoryItem } from "@/types/inventory";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/searchBar";
import { Filters } from "@/components/filters";
import { ResultsTable } from "@/components/resultTable";
import { EmptyState } from "@/components/emptyState";

const DEFAULT_FILTERS: FilterState = {
  q: "",
  category: "",
  minPrice: "",
  maxPrice: "",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [results, setResults] = useState<InventoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchResults = useCallback(async (f: FilterState) => {
    const error = validatePriceParams(f.minPrice, f.maxPrice);
    if (error) {
      setPriceError(error);
      return;
    }
    setPriceError(null);

    const params = new URLSearchParams();
    if (f.q) params.set("q", f.q);
    if (f.category && f.category !== "all") params.set("category", f.category);
    if (f.minPrice) params.set("minPrice", f.minPrice);
    if (f.maxPrice) params.set("maxPrice", f.maxPrice);

    setLoading(true);
    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data.data ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(filters);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, fetchResults]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPriceError(null);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Search</h1>
        <p className="text-muted-foreground mt-1">
          Browse surplus inventory from suppliers across India
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col gap-4 mb-8 p-4 border rounded-lg bg-card">
        <SearchBar value={filters.q} onChange={(v) => updateFilter("q", v)} />
        <Filters
          category={filters.category}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          priceError={priceError}
          onCategoryChange={(v) => updateFilter("category", v)}
          onMinPriceChange={(v) => updateFilter("minPrice", v)}
          onMaxPriceChange={(v) => updateFilter("maxPrice", v)}
        />
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="self-start text-sm text-muted-foreground underline hover:text-foreground"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="rounded-md border min-h-125">
        {loading && (
          <div className="animate-pulse p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded" />
            ))}
          </div>
        )}

        {!loading && hasFetched && results.length === 0 && (
          <EmptyState query={filters.q} />
        )}

        {!loading && results.length > 0 && (
          <ResultsTable items={results} total={total} />
        )}
      </div>
    </main>
  );
}
