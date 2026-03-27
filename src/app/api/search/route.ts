import { searchInventory, validatePriceParams } from "@/lib/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = {
    q: searchParams.get("q") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    minPrice: searchParams.get("minPrice") ?? undefined,
    maxPrice: searchParams.get("maxPrice") ?? undefined,
  };

  const validatationError = validatePriceParams(
    params.minPrice,
    params.maxPrice,
  );

  if (validatationError) {
    return NextResponse.json(
      { error: validatationError, code: "INVALID_PARAMS" },
      { status: 400 },
    );
  }

  const results = searchInventory(params);

  const filters_applied: Record<string, string> = {};
  if (params.q) filters_applied.q = params.q;
  if (params.category) filters_applied.category = params.category;
  if (params.minPrice) filters_applied.minPrice = params.minPrice;
  if (params.maxPrice) filters_applied.maxPrice = params.maxPrice;

  return NextResponse.json({
    data: results,
    total: results.length,
    filters_applied,
  });
}
