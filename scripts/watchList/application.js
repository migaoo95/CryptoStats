// Init Classes
const marketApi = new ApiData();
const domUi = new DomUI();
const storage = new Store();
const charts = new Charts();
function showWatchlistTokens() {
  // Get LocalStorage Data in lowerCases ---------------------------- { Get LS Data }
  let storedCurrencies = storage
    .getStoredData()
    .map((coin) => coin.toLowerCase());
  // console.log(storedCurrencies);
  // Get Api Data ------------------------------- { Get Api Data }
  marketApi
    .getData()
    .then((data) => {
      // Filter Throught Api Data -------------------------- { Filter }
      const storedCoinsData = data.marketDataJsonAll.filter((coin) => {
        if (storedCurrencies.includes(coin.id)) {
          return coin;
        }
      });
      // For Each
      storedCoinsData.forEach((coin, index) => {
        domUi.createLeaderBoard(coin, index);
      });
      // Result here
      console.log(storedCoinsData);
      return data;
    })
    .then((data) => {
      // console.log(data.marketDataJson);
      charts.generateCharts(data.marketDataJsonAll);
    });
}
// Call Function To Display all Coins
showWatchlistTokens();
// Display currency in modal ----------------------- { Shared }
document.querySelector(".row").addEventListener("click", (e) => {
  modalShared(e);
});
// Chart Timestamp, Watchlist in modal, Clipboard ----------------- { Shared }
document.getElementById("lModalBody").addEventListener("click", (e) => {
  watchListShared(e);
});
document.getElementById("row").addEventListener("click", (e) => {
  let page = "watch";
  singleCoinWatch(e, page);
});
