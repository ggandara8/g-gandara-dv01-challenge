import { FilterDropdown } from "@/components/ui/custom-dropdown";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function Filters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Loans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <FilterDropdown filterKey="homeOwnership" label="Home Ownership" />
          <FilterDropdown filterKey="quarter" label="Quarter" />
          <FilterDropdown filterKey="term" label="Term" />
          <FilterDropdown filterKey="year" label="Year" />
        </div>
      </CardContent>
    </Card>
  );
}
