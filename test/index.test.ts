import { describe, expect, test } from '@jest/globals';
import { getPrice } from '../src/index';
import { Category } from '../src/types/category';

describe('getPrice', () => {
  test('should return the price of an asset', async () => {
    const category: Category = 'currencies';
    const pair = 'eur-usd';
    const price = await getPrice(category, pair);
    expect(price).toBeDefined();
    expect(price?.ask).toBeGreaterThan(0);
    expect(price?.buy).toBeGreaterThan(0);
  }, 9000);
});
