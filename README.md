# Zeerostock Inventory Search

A simple inventory search feature with filtering — built with Next.js, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API

```
GET /api/search?q=cotton&category=Textiles&minPrice=100&maxPrice=5000
```

| Param      | Description                              |
| ---------- | ---------------------------------------- |
| `q`        | Product name (partial, case-insensitive) |
| `category` | Exact category match                     |
| `minPrice` | Minimum price (₹)                        |
| `maxPrice` | Maximum price (₹)                        |

All params optional. No filters → returns all records.

## Search Logic

Filters are applied sequentially on an in-memory array inside `lib/search.ts` — a pure function decoupled from the API layer.

- **Name match** — lowercases both query and record name, uses `.includes()` for partial matching
- **Category** — exact match after lowercasing
- **Price range** — `>=` minPrice and `<=` maxPrice, applied independently
- **Validation** runs before search — invalid price range returns `400` immediately
- **Debouncing** (300ms) on the frontend prevents an API call on every keystroke

## Performance Improvement for Large Datasets

The current approach does a full linear scan — O(n) per request. For large datasets, I'd switch to a real database (PostgreSQL) and add
indexes on `name`, `category`, and `price` columns so queries don't
scan every row. I'd also add caching for repeated searches so the
database isn't hit every time.
