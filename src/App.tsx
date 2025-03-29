import { Filters } from "@/components/filters";
import { AggregatedTable } from "@/components/aggregated-table";
import { GradeBarChart } from "@/components/bar-chart"; // no lazy

export default function App() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="pt-6 pb-4">
        <div className="max-w-6xl mx-auto text-center space-y-1 px-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Loan Data Dashboard
          </h1>
          <p className="text-muted-foreground text-base">
            Filter and explore aggregated loan data by grade
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 px-4 pb-12">
        <Filters />
        <GradeBarChart />
        <AggregatedTable />
      </div>
    </div>
  );
}
