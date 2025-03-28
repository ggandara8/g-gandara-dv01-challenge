import Papa from "papaparse";

export interface LoanData {
  year: string;
  quarter: string;
  grade: string;
  homeOwnership: string;
  term: string;
  currentBalance: string;
}

const parseData = (
  result: Papa.ParseResult<string[]>,
  rawData: LoanData[]
): LoanData[] => {
  result.data.splice(0, 2); // Remove header rows
  const { data } = result;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const [year, quarter, grade, homeOwnership, term, currentBalance] = row;

    if (year && quarter && grade && homeOwnership && term && currentBalance) {
      rawData.push({
        year,
        quarter,
        grade,
        homeOwnership,
        term,
        currentBalance,
      });
    }
  }

  return rawData;
};

export const getData = async (): Promise<LoanData[]> => {
  const csvData = await fetch("/loansize.csv").then((res) => res.text());
  const data: LoanData[] = [];

  await new Promise<void>((resolve) => {
    Papa.parse<string[]>(csvData, {
      complete: (result) => {
        parseData(result, data);
        resolve();
      },
    });
  });

  return data;
};
