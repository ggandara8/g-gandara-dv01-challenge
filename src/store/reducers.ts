import type { DataPoint, Filters } from "./types";

/**
 * Checks whether a data item matches the current set of active filters.
 * Ignores filters with null values.
 */
export const matchesFilters = (item: DataPoint, filters: Filters): boolean => {
  return Object.entries(filters).every(([key, value]) => {
    if (value === null) return true;
    return item[key as keyof DataPoint] === value;
  });
};

/**
 * Aggregates the current balance by loan grade.
 * Parses string values into floats and sums them per grade.
 *
 * @returns A map of grade => total current balance
 */
export const aggregateCurrentBalanceByGrade = (
  data: DataPoint[]
): Record<string, number> => {
  return data.reduce<Record<string, number>>((acc, item) => {
    const grade = item.grade;
    const balance = parseFloat(item.currentBalance);

    if (!isNaN(balance)) {
      acc[grade] = (acc[grade] || 0) + balance;
    }

    return acc;
  }, {});
};

/**
 * Extracts sorted, unique values from the dataset for each of the given keys.
 * Used to populate dropdown filter options.
 *
 * @returns A map of key => sorted unique string values
 */
export const getUniqueValuesForFilters = (
  data: DataPoint[],
  keys: (keyof DataPoint)[]
): Record<string, string[]> => {
  const sets: Record<string, Set<string>> = {};

  // Initialize empty sets for each key
  keys.forEach((key) => {
    sets[key] = new Set<string>();
  });

  // Add values to corresponding sets
  data.forEach((item) => {
    keys.forEach((key) => {
      sets[key].add(item[key]);
    });
  });

  // Convert sets to sorted arrays
  const result: Record<string, string[]> = {};
  Object.entries(sets).forEach(([key, set]) => {
    result[key] = Array.from(set).sort();
  });

  return result;
};
