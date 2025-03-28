import { FilterDropdown } from "@/components/ui/custom-dropdown";

export function Filters() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <FilterDropdown filterKey="homeOwnership" label="Home Ownership" />
        <FilterDropdown filterKey="quarter" label="Quarter" />
        <FilterDropdown filterKey="term" label="Term" />
        <FilterDropdown filterKey="year" label="Year" />
      </div>
    </div>
  );
}
