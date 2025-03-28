"use client";

import { ColumnDef } from "@tanstack/react-table";

export type GradeTotals = {
  [grade: string]: string; // grade key (1–6), value = total balance as string
};

// Factory to generate columns dynamically from grade keys
export function generateGradeColumns(
  grades: string[]
): ColumnDef<GradeTotals>[] {
  return grades.map((grade) => ({
    accessorKey: grade,
    header: `Grade ${grade}`,
    cell: ({ row }) => <div className="text-left">${row.getValue(grade)}</div>,
  }));
}
