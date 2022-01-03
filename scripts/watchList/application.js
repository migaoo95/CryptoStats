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
      console.log("Stored Coins", storedCoinsData);
      if (storedCoinsData.length <= 0) {
        domUi.showMsg();
      }
      document.getElementById("coinCounter").textContent =
        storedCoinsData.length;
      return data;
    })
    .then((data) => {
      // console.log(data.marketDataJson);
      document.querySelectorAll("#leaderCard").forEach((card) => {
        // console.log(card.children[0].children[1].children[3].children[1].textContent);
        let precentage = parseInt(
          card.children[0].children[1].children[3].children[1].textContent
        );
        let canvas = card.children[0].children[1].lastElementChild;
        // Get coin name from each currency box
        let coin =
          card.children[0].children[1].children[1].textContent.toLocaleLowerCase();
        // Api Call
        marketApi.getCoinData(coin).then((data) => {
          // console.log("Then", data.coinChartJson);
          charts.generateSingleChartTest(
            data.coinChartJson,
            canvas,
            precentage
          );
        });
        // console.log(
        //   "card",
        //   card.children[0].children[1].children[1].textContent
        // );
        // console.log("canvas", card.children[0].children[1].lastElementChild);
      });
      // charts.generateChartsTest(data.marketDataJsonAll);
    });
}
// Call Function To Display all Coins
showWatchlistTokens();
// Display currency in modal ----------------------- { shared.js }
document.querySelector(".row").addEventListener("click", (e) => {
  modalShared(e);
});
// Chart Timestamp, Watchlist in modal, Clipboard ----------------- { shared.js }
document.getElementById("lModalBody").addEventListener("click", (e) => {
  watchListShared(e);
});
// Click Event for Watchlist currencies and displaing Data in Modal ----------- { shared.js }
document.getElementById("row").addEventListener("click", (e) => {
  let page = "watch";
  singleCoinWatch(e, page);
});
