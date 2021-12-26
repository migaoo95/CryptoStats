class ApiData {
  constructor(currencyName) {
    this.topTwoHundred = 250;
    this.defaultRanking = 10;
    this.ranking = this.defaultRanking;
  }
  changeRanking(newRanking) {
    this.ranking = newRanking;
  }
  async getData() {
    const marketDataResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.ranking}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );

    const marketDataResponseAll = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.topTwoHundred}&page=1&sparkline=false`
    );

    const marketDataJson = await marketDataResponse.json();
    const marketDataJsonAll = await marketDataResponseAll.json();

    return {
      marketDataJson,
      marketDataJsonAll,
    };
  }
  async getCoinData(coin) {
    const coinDataResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=true`
    );
    const coinChartResponse =
      await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7
    `);
    const coinDataJson = await coinDataResponse.json();
    const coinChartJson = await coinChartResponse.json();
    return {
      coinDataJson,
      coinChartJson,
    };
  }
}
