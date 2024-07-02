import { chromium } from 'playwright';
import { LABELS } from './constants/labels';
import { Price } from './types/price';
import { Category } from './types/category';

const BASE_URL = 'https://es.investing.com';

/**
 * Get the price of an asset.
 *
 * @param category The category of the asset.
 * @param pair The pair of the asset.
 * @returns The price of the asset.
 */
const getPrice = async (
  category: Category,
  pair: string
): Promise<Price | undefined> => {
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/${category}/${pair}`, {
      timeout: 40000,
    });

    const promises: Promise<{
      [key: keyof typeof LABELS]: Price[keyof Price] | null;
    }>[] = Object.entries(LABELS).map(async ([key, value]) => {
      return page.textContent(value).then((text) => {
        const weekRange = key === 'weekRange' ? text?.split('-') : null;

        if (weekRange?.length) {
          return {
            [key]: {
              low: parseFloat(weekRange[0].replace(',', '.')),
              high: parseFloat(weekRange[1].replace(',', '.')),
            },
          };
        }

        return {
          [key]: text ? parseFloat(text.replace(',', '.')) : null,
        };
      });
    });

    const results = await Promise.allSettled(promises);
    const data = results.reduce((acc, result) => {
      const value = 'value' in result ? result.value : null;
      return { ...acc, ...value };
    }, {} as Price);
    data.date = new Date().toISOString();

    return data;
  } catch (error: unknown) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

const stockMarketScraper = {
  getPrice,
};

export default stockMarketScraper;
