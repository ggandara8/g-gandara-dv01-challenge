// src/store/useDataStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getData } from "@/request/api";
import type { LoanState } from "./types";
import { aggregateByGrade } from "./helpers.ts/aggregateDataByGrade";

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
          const unique = {
            homeOwnership: new Set<string>(),
            quarter: new Set<string>(),
            term: new Set<string>(),
            year: new Set<string>(),
          };

          rawData.forEach((item) => {
            unique.homeOwnership.add(item.homeOwnership);
            unique.quarter.add(item.quarter);
            unique.term.add(item.term);
            unique.year.add(item.year);
          });

          return {
            homeOwnership: Array.from(unique.homeOwnership).sort(),
            quarter: Array.from(unique.quarter).sort(),
            term: Array.from(unique.term).sort(),
            year: Array.from(unique.year).sort(),
          };
        },

        filteredData: () => {
          const { rawData, filters } = get();
          return rawData.filter((item) => {
            return (
              (filters.homeOwnership === null ||
                item.homeOwnership === filters.homeOwnership) &&
              (filters.quarter === null || item.quarter === filters.quarter) &&
              (filters.term === null || item.term === filters.term) &&
              (filters.year === null || item.year === filters.year)
            );
          });
        },

        aggregateByGrade: () => {
          const { filters, rawData } = get();
          const filtered = get().filteredData(); // or re-implement here
          const dataToUse = Object.values(filters).every((v) => v === null)
            ? rawData
            : filtered;
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
