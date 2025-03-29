import { LoanStoreProvider } from "@/context/index";
import { Filters } from "@/components/filters";
import { AggregatedTable } from "@/components/aggregated-table";
import { GradeBarChart } from "./bar-chart";

export function LoanDashboard() {
  return (
    <LoanStoreProvider>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Loan Summary</h1>
          <p className="text-muted-foreground text-sm">
            Filter and explore current balances by loan grade
          </p>
        </div>

        <Filters />
        <GradeBarChart />
        <AggregatedTable />
      </div>
    </LoanStoreProvider>
  );
}
