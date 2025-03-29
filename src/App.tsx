import { Filters } from "@/components/filters";
import { AggregatedTable } from "@/components/aggregated-table";
import { GradeBarChart } from "@/components/bar-chart";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Loan Data Dashboard
          </h1>
          <p className="text-muted-foreground">
            Filter and explore aggregated loan data by grade
          </p>
        </div>

        <Filters />
        <GradeBarChart />
        <AggregatedTable />
      </div>
    </div>
  );
}
