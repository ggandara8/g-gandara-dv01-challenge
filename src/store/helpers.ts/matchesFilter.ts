import { DataPoint, Filters } from "../types";

export const matchesFilters = (item: DataPoint, filters: Filters) => {
  return Object.entries(filters).every(([key, value]) => {
    if (value === null) return true;
    return item[key as keyof DataPoint] === value;
  });
};
