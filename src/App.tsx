// App.tsx
import "./App.css";
import { Filters } from "@/components/filters";
import { AggregatedTable } from "@/components/aggregated-table";
import { GradeBarChart } from "./components/bar-chart";

function App() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Filters />
      <GradeBarChart />
      <AggregatedTable />
    </div>
  );
}

export default App;
