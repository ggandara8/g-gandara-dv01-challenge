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
import { currencyFormatter } from "@/utils/formatters";

export function GradeBarChart() {
  const { aggregateByGrade } = useDataStore();
  const aggregated = aggregateByGrade();

  const chartData = useMemo(() => {
    return Object.entries(aggregated)
      .map(([grade, total]) => ({
        grade,
        total: Number(total.toFixed(2)),
      }))
      .sort((a, b) => a.grade.localeCompare(b.grade));
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
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis
                dataKey="grade"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
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
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 12 }}
                formatter={(value: number) => currencyFormatter.format(value)}
              />
              <Bar
                dataKey="total"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                className="transition-all duration-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
