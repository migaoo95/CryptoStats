class ApiData {
  constructor(currencyName) {
    this.topTwoHundred = 200;
    this.defaultRanking = 10;
    this.ranking = this.defaultRanking;
    this.chartTimeStamp = this.chartTimeStamp;
    this.dafaultTimeStamp = 1;
  }
  // Change A Chart Timestamp ------------------ { TimeStamp }
  changeChartTimeStamp(timeStamp) {
    this.dafaultTimeStamp = timeStamp;
    console.log("New Ranking", this.dafaultTimeStamp);
  }
  // Change how many coins are recived in a API Call --------------- { Ranking Amount Shown }
  changeRanking(newRanking) {
    this.ranking = newRanking;
  }
  async getData() {
    const marketDataResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.ranking}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );

    const marketDataResponseAll = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.topTwoHundred}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    );
    const globalMarketDataResponse =
      await fetch(`https://api.coingecko.com/api/v3/global
    `);

    const marketDataJson = await marketDataResponse.json();
    const marketDataJsonAll = await marketDataResponseAll.json();
    const globalDataJson = await globalMarketDataResponse.json();
    return {
      marketDataJson,
      marketDataJsonAll,
      globalDataJson,
    };
  }
  async getCoinData(coin) {
    const coinDataResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=true`
    );
    const coinChartResponse =
      await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${this.dafaultTimeStamp}
    `);
    const coinDataJson = await coinDataResponse.json();
    const coinChartJson = await coinChartResponse.json();
    return {
      coinDataJson,
      coinChartJson,
    };
  }
}
