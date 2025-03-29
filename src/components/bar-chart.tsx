"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDataStore } from "@/store/useLoanStore";
import { useMemo } from "react";

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
    <Card>
      <CardHeader>
        <CardTitle>Current Balance by Grade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
