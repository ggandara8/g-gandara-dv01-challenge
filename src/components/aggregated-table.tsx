import { useMemo } from "react";
import { useDataStore } from "@/store/useLoanStore";
import { generateGradeColumns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { currencyFormatter } from "@/utils/index";

export function AggregatedTable() {
  // Pull actions and computed state from the global store
  const { resetFilters, aggregateByGrade } = useDataStore();

  // Compute aggregated balance totals by grade (filtered or raw)
  const aggregated = aggregateByGrade();

  // Format the aggregated result into a table-friendly shape
  // We create a single-row object like: { A: "$3,000.00", B: "$1,500.00" }
  const aggregatedTableData = useMemo(() => {
    return [
      Object.fromEntries(
        Object.entries(aggregated).map(([grade, total]) => [
          grade,
          currencyFormatter.format(total),
        ])
      ),
    ];
  }, [aggregated]);

  // Dynamically generate column headers based on grade keys
  const gradeKeys = useMemo(() => Object.keys(aggregated).sort(), [aggregated]);

  // Generate dynamic column config for the table
  const dynamicColumns = useMemo(
    () => generateGradeColumns(gradeKeys),
    [gradeKeys]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Aggregated Balances</CardTitle>
          {/* 🔄 One-click reset to clear all filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="p-4"
          >
            Reset Filters
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* 🧾 Render the data table with dynamic columns and single-row totals */}
        <DataTable columns={dynamicColumns} data={aggregatedTableData} />
      </CardContent>
    </Card>
  );
}
