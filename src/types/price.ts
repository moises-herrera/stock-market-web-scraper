/**
 * Represents the price of an asset.
 */
export type Price = {
  date: string | null;
  priceLatest: number | null;
  prevClose: number | null;
  buy: number | null;
  dailyRange: number | null;
  open: number | null;
  ask: number | null;
  weekRange: {
    low: number | null;
    high: number | null;
  };
  oneYearReturn: number | null;
};
