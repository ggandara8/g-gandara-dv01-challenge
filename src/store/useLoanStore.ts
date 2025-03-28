import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getData } from "@/request/api";
import { defaultFilters, type LoanState } from "./types";
import {
  aggregateCurrentBalanceByGrade,
  matchesFilters,
  getUniqueValuesForFilters,
} from "./reducers";

export const useDataStore = create<LoanState>()(
  devtools(
    persist(
      (set, get) => ({
        rawData: [],
        filters: {
          ...defaultFilters,
        },
        fetchData: async () => {
          try {
            const data = await getData();
            set({ rawData: data });
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        },
        setFilter: (key, value) => {
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: value,
            },
          }));
        },
        resetFilters: () => {
          set(() => ({
            filters: {
              ...defaultFilters,
            },
          }));
        },
        uniqueValues: () => {
          const { rawData } = get();
          return getUniqueValuesForFilters(rawData, [
            "homeOwnership",
            "quarter",
            "term",
            "year",
          ]);
        },
        filteredData: () => {
          const { rawData, filters } = get();
          return rawData.filter((item) => matchesFilters(item, filters));
        },
        aggregateByGrade: () => {
          const { filters, rawData } = get();
          const filtersActive = Object.values(filters).some((v) => v !== null);
          const dataToUse = filtersActive
            ? rawData.filter((item) => matchesFilters(item, filters))
            : rawData;
          return aggregateCurrentBalanceByGrade(dataToUse);
        },
      }),
      {
        name: "loan-store",
        skipHydration: false,
        onRehydrateStorage: () => {
          return (state) => {
            if (state?.rawData.length === 0) {
              state.fetchData();
            }
          };
        },
      }
    )
  )
);
