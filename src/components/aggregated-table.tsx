// components/aggregated-table.tsx
import { useMemo } from "react";
import { useDataStore } from "@/store/useLoanStore";
import { generateGradeColumns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "./ui/button";

export function AggregatedTable() {
  const { resetFilters, aggregateByGrade } = useDataStore();
  const aggregated = aggregateByGrade();

  const aggregatedTableData = useMemo(() => {
    return [
      Object.fromEntries(
        Object.entries(aggregated).map(([grade, total]) => [
          grade,
          total.toFixed(2),
        ])
      ),
    ];
  }, [aggregated]);

  const gradeKeys = useMemo(() => Object.keys(aggregated).sort(), [aggregated]);
  const dynamicColumns = useMemo(
    () => generateGradeColumns(gradeKeys),
    [gradeKeys]
  );

  return (
    <div>
      <DataTable columns={dynamicColumns} data={aggregatedTableData} />
      <div>
        <Button variant="ghost" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
