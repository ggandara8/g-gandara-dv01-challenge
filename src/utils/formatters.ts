/**
 * A shared currency formatter for USD.
 * Localized, reusable, and memo-safe.
 */
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
