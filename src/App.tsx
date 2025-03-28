// App.tsx
import "./App.css";
import { Filters } from "@/components/filters";
import { AggregatedTable } from "@/components/aggregated-table";

function App() {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <Filters />
      <AggregatedTable />
    </div>
  );
}

export default App;
