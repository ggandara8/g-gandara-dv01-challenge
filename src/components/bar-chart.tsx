"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDataStore } from "@/store/useLoanStore";
import { useMemo } from "react";
import { currencyFormatter } from "@/utils/index";

export function GradeBarChart() {
  // Get the current aggregated balance by grade from the store
  const { aggregateByGrade } = useDataStore();
  const aggregated = aggregateByGrade();

  // Transform the data into a shape Recharts understands: [{ grade: "A", total: 3000 }]
  const chartData = useMemo(() => {
    return Object.entries(aggregated)
      .map(([grade, total]) => ({
        grade,
        total: Number(total.toFixed(2)), // Ensure consistent numeric precision
      }))
      .sort((a, b) => a.grade.localeCompare(b.grade)); // Alphabetical sort for consistent x-axis
  }, [aggregated]);

  return (
    <Card className="shadow-sm border rounded-xl">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold">
          Current Balance by Grade
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              {/* Light grid for visual structure */}
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />

              {/* X-axis with grade labels */}
              <XAxis
                dataKey="grade"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />

              {/* Y-axis with compact currency labels */}
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(value)
                }
              />

              {/* Hover tooltip with full currency formatting */}
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
                formatter={(value: number) => currencyFormatter.format(value)}
              />

              {/* Main bar series */}
              <Bar
                dataKey="total"
                fill="#2563eb" // Tailwind's blue-600
                radius={[4, 4, 0, 0]} // Rounded top corners
                className="transition-all duration-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
