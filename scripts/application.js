// Init Api Class
const marketApi = new ApiData();
// Init Dom Ui Class
const domUi = new DomUI();
// Get Api object on load ------------------------- { Promise }
marketApi.getData().then((data) => {
  // Sort descending cryptocurrencies by price action -------------------------- { Sort }
  const sortCoins = data.marketDataJsonAll.sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h;
  });

  const slicedArray = sortCoins.slice(0, 3);
  const newSliced = sortCoins.slice(-3).reverse();
  // GAINERS
  slicedArray.forEach((coin) => {
    domUi.displayLoosers(coin);
  });
  //   LOOSERS
  newSliced.forEach((coin) => {
    domUi.displayGainers(coin);
  });
  //   LEADERBOARD
  data.marketDataJson.forEach((currency, index) => {
    // console.log(currency);
    // console.log(index);
    domUi.createLeaderBoard(currency, index);
  });
});
// Change amount of coins displaied within Leaderboard -------------------------- { Event }
document.getElementById("ranking").addEventListener("change", (e) => {
  marketApi.changeRanking(e.target.value);
  domUi.refresh();
  marketApi.getData().then((data) => {
    data.marketDataJson.forEach((currency, index) => {
      //   console.log(currency);
      domUi.createLeaderBoard(currency, index);
    });
  });
});
