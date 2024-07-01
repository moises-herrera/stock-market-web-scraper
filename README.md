# Stock Market Web Scraper

Reusable stock web scraper to get the information about the price of an asset from es.investing.com

### Install

```
npm install @moises-herrera/stock-market-scraper
```

### Example

```
import stockMarketScraper from '@moises-herrera/stock-market-scraper';

async function bootstrap() {
  try {
    const btcUsdPrice = await stockMarketScraper.getPrice(
      'currencies', 
      'eur/usd' // Using a valid pair from es.investing.com
    );
  } catch (error) {
    console.error(error);
  }
}
```
