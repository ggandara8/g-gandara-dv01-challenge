export type DataPoint = {
  currentBalance: string;
  grade: string;
  homeOwnership: string;
  quarter: string;
  term: string;
  year: string;
};

export type Filters = {
  homeOwnership: string | null;
  quarter: string | null;
  term: string | null;
  year: string | null;
};

export type LoanState = {
  rawData: DataPoint[];
  filters: Filters;
  fetchData: () => Promise<void>;
  setFilter: (key: keyof Filters, value: string | null) => void;
  resetFilters: () => void;
  filteredData: () => DataPoint[];
  uniqueValues: () => Record<keyof Filters, string[]>;
  aggregateByGrade: () => Record<string, number>;
};

export const defaultFilters = {
  homeOwnership: null,
  quarter: null,
  term: null,
  year: null,
};
