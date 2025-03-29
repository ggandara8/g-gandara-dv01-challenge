import {
  matchesFilters,
  aggregateCurrentBalanceByGrade,
  getUniqueValuesForFilters,
} from "./reducers";
import type { DataPoint, Filters } from "./types";
import { expect, it, describe } from "vitest";

const mockData: DataPoint[] = [
  {
    currentBalance: "1000",
    grade: "A",
    homeOwnership: "RENT",
    quarter: "1",
    term: "36 months",
    year: "2021",
  },
  {
    currentBalance: "2000",
    grade: "B",
    homeOwnership: "OWN",
    quarter: "2",
    term: "60 months",
    year: "2021",
  },
  {
    currentBalance: "3000",
    grade: "A",
    homeOwnership: "MORTGAGE",
    quarter: "1",
    term: "36 months",
    year: "2020",
  },
];

describe("matchesFilters", () => {
  it("should return true when all filters match", () => {
    const filters: Filters = {
      homeOwnership: "RENT",
      quarter: "1",
      term: "36 months",
      year: "2021",
    };
    expect(matchesFilters(mockData[0], filters)).toBe(true);
  });

  it("should return false when one filter fails", () => {
    const filters: Filters = {
      homeOwnership: "RENT",
      quarter: "2", // doesn't match
      term: "36 months",
      year: "2021",
    };
    expect(matchesFilters(mockData[0], filters)).toBe(false);
  });

  it("should return true when all filters are null", () => {
    const filters: Filters = {
      homeOwnership: null,
      quarter: null,
      term: null,
      year: null,
    };
    expect(matchesFilters(mockData[0], filters)).toBe(true);
  });
});

describe("aggregateCurrentBalanceByGrade", () => {
  it("should correctly sum current balance by grade", () => {
    const result = aggregateCurrentBalanceByGrade(mockData);
    expect(result).toEqual({
      A: 4000,
      B: 2000,
    });
  });

  it("should handle invalid numbers gracefully", () => {
    const badData = [
      ...mockData,
      {
        ...mockData[0],
        currentBalance: "invalid",
        grade: "C",
      },
    ];
    const result = aggregateCurrentBalanceByGrade(badData);
    expect(result).toEqual({
      A: 4000,
      B: 2000,
    });
  });
});

describe("getUniqueValuesForFilters", () => {
  it("should return unique, sorted values for each key", () => {
    const result = getUniqueValuesForFilters(mockData, [
      "homeOwnership",
      "quarter",
      "term",
      "year",
    ]);

    expect(result).toEqual({
      homeOwnership: ["MORTGAGE", "OWN", "RENT"],
      quarter: ["1", "2"],
      term: ["36 months", "60 months"],
      year: ["2020", "2021"],
    });
  });

  it("should return empty arrays when no data", () => {
    const result = getUniqueValuesForFilters([], ["homeOwnership", "quarter"]);

    expect(result).toEqual({
      homeOwnership: [],
      quarter: [],
    });
  });
});
