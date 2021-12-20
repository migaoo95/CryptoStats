// Init Api Class
const marketApi = new ApiData();
// Init Dom Ui Class
const domUi = new DomUI();
// Init LocalStorage Class
const storage = new Store();
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
  // ForEach data recived call UI method -------------------------- { LeaderBoard }
  data.marketDataJson.forEach((currency, index) => {
    // console.log(storedCoins);
    domUi.createLeaderBoard(currency, index);
    // const leaderBoardTokens = document.querySelectorAll("#leaderCard");
    // domUi.watchListClasses(leaderBoardTokens);
  });
});
// Change amount of coins displaied within Leaderboard -------------------------- { Change LeaderBoard }
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
// Watchlist event -------------------------- { Add WatchList }
document.getElementById("row").addEventListener("click", (e) => {
  if (e.target.classList.contains("star")) {
    storage.addCoinToStorage(
      e.target.parentElement.nextElementSibling.childNodes[3].textContent
    );
    domUi.watchList(e.target.parentElement.children[1]);
    // console.log(
    //   e.target.parentElement.nextElementSibling.childNodes[3].textContent
    // );
  }
});
// Display what is already being watched -------------------------- { OnContentLoad WatchList }
document.addEventListener("DOMContentLoaded", () => {
  //   const leaderBoardTokens = document.querySelectorAll("#leaderCard");
  //   console.log(leaderBoardTokens);
});
