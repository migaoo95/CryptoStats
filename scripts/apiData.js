class ApiData {
  async getData() {
    const marketDataResponse = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const marketDataJson = await marketDataResponse.json();
    return {
      marketDataJson,
    };
  }
}
