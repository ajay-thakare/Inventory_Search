import { Input } from "./ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search products... (e.g. cotton, boxes, bolts)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-4 pr-4 py-2 text-base"
      />
    </div>
  );
}
