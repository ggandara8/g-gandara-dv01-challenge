import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/useLoanStore";

type FilterKey = "homeOwnership" | "quarter" | "term" | "year";

type Props = {
  filterKey: FilterKey;
  label: string;
};

export function FilterDropdown({ filterKey, label }: Props) {
  const { filters, uniqueValues, setFilter } = useDataStore();
  const selectedValue = filters[filterKey];
  const values = uniqueValues();
  const options = values[filterKey];

  const handleSelect = (value: string | null) => {
    setFilter(filterKey, value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize w-full text-left">
          {selectedValue ?? `All ${label}s`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleSelect(null)}>
          All
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => handleSelect(option)}
            className="capitalize"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
