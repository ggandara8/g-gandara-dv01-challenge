import { DataPoint } from "../types";

export const aggregateByGrade = (data: DataPoint[]): Record<string, number> => {
  return data.reduce<Record<string, number>>((acc, item) => {
    const grade = item.grade;
    const balance = parseFloat(item.currentBalance);

    if (!isNaN(balance)) {
      acc[grade] = (acc[grade] || 0) + balance;
    }

    return acc;
  }, {});
};
