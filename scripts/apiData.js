class ApiData {
  constructor(top) {
    this.topTwoHundred = 250;
    this.defaultRanking = 10;
    this.ranking = this.defaultRanking;
  }
  changeRanking(newRanking) {
    this.ranking = newRanking;
  }
  async getData() {
    const marketDataResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.ranking}&page=1&sparkline=false`
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
}
