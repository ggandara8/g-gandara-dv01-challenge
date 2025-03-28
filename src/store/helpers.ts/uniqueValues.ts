export const getUniqueValues = <T>(
  data: T[],
  fields: (keyof T)[]
): Record<string, string[]> => {
  const result: Record<string, Set<string>> = {};

  fields.forEach((field) => {
    result[field as string] = new Set();
  });

  data.forEach((item) => {
    fields.forEach((field) => {
      result[field as string].add(item[field] as string);
    });
  });

  const final: Record<string, string[]> = {};
  Object.entries(result).forEach(([key, set]) => {
    final[key] = Array.from(set).sort();
  });

  return final;
};
