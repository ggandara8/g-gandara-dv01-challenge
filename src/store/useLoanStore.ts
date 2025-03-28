// src/store/useDataStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getData } from "@/request/api";
import type { LoanState } from "./types";
import { aggregateByGrade } from "./helpers.ts/aggregateDataByGrade";
import { matchesFilters } from "./helpers.ts/matchesFilter";
import { getUniqueValues } from "./helpers.ts/uniqueValues";

export const useDataStore = create<LoanState>()(
  devtools(
    persist(
      (set, get) => ({
        rawData: [],
        filters: {
          homeOwnership: null,
          quarter: null,
          term: null,
          year: null,
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
              homeOwnership: null,
              quarter: null,
              term: null,
              year: null,
            },
          }));
        },
        uniqueValues: () => {
          const { rawData } = get();
          return getUniqueValues(rawData, [
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
          return aggregateByGrade(dataToUse);
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
