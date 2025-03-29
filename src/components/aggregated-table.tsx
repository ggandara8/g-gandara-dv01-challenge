import { useMemo } from "react";
import { useDataStore } from "@/store/useLoanStore";
import { generateGradeColumns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { currencyFormatter } from "@/utils/index";

export function AggregatedTable() {
  const { resetFilters, aggregateByGrade } = useDataStore();
  const aggregated = aggregateByGrade();

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

  const gradeKeys = useMemo(() => Object.keys(aggregated).sort(), [aggregated]);
  const dynamicColumns = useMemo(
    () => generateGradeColumns(gradeKeys),
    [gradeKeys]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Aggregated Balances</CardTitle>
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
        <DataTable columns={dynamicColumns} data={aggregatedTableData} />
      </CardContent>
    </Card>
  );
}
