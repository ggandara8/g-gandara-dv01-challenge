import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getData } from "@/request/api";
import { defaultFilters, type LoanState } from "./types";
import {
  aggregateCurrentBalanceByGrade,
  matchesFilters,
  getUniqueValuesForFilters,
} from "./reducers";

// Global Zustand store to manage loan data, filters, and derived aggregations
export const useDataStore = create<LoanState>()(
  devtools(
    persist(
      (set, get) => ({
        // Raw loan data loaded from API
        rawData: [],

        // Current selected filter state
        filters: {
          ...defaultFilters,
        },

        // Async fetch method to load data
        fetchData: async () => {
          try {
            const data = await getData();
            set({ rawData: data });
          } catch (error) {
            console.error("Failed to fetch data:", error);
          }
        },

        // Update a specific filter (e.g. year, term, quarter, etc.)
        setFilter: (key, value) => {
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: value,
            },
          }));
        },

        // Reset all filters back to initial state
        resetFilters: () => {
          set(() => ({
            filters: {
              ...defaultFilters,
            },
          }));
        },

        // Compute unique values for dropdown options based on raw data
        uniqueValues: () => {
          const { rawData } = get();
          return getUniqueValuesForFilters(rawData, [
            "homeOwnership",
            "quarter",
            "term",
            "year",
          ]);
        },

        // Return a filtered subset of the raw data based on current filters
        filteredData: () => {
          const { rawData, filters } = get();
          return rawData.filter((item) => matchesFilters(item, filters));
        },

        // Return total balance aggregated by grade
        // If no filters are active, it returns aggregate from rawData
        // Otherwise, it computes from the filtered subset
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
        name: "loan-store", // Store key for persistence
        skipHydration: false,

        // Rehydrate persisted store & refetch data if necessary
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
