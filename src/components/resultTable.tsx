import { InventoryItem } from "@/types/inventory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

interface Props {
  items: InventoryItem[];
  total: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700",
  Textiles: "bg-purple-100 text-purple-700",
  Hardware: "bg-orange-100 text-orange-700",
  Packaging: "bg-yellow-100 text-yellow-700",
  Chemicals: "bg-red-100 text-red-700",
  "Food & Beverage": "bg-green-100 text-green-700",
};

export function ResultsTable({ items, total }: Props) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-3">
        Showing <span className="font-semibold text-foreground">{total}</span>{" "}
        result{total !== 1 ? "s" : ""}
      </p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty Available</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      CATEGORY_COLORS[item.category] ??
                      "bg-gray-100 text-gray-700"
                    }
                    variant="outline"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  ₹{item.price.toLocaleString("en-IN")}/{item.unit}
                </TableCell>
                <TableCell>
                  {item.quantity.toLocaleString("en-IN")} {item.unit}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.supplier}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.location}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
