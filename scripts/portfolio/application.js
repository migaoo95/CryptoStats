const marketApi = new ApiData();
const domUi = new DomUI();
let coinArr = [];
marketApi.getData().then((data) => {
  // console.log(data.marketDataJsonAll);
  data.marketDataJsonAll.forEach((coin) => {
    coinArr.push(coin);
  });
  document.getElementById("searchBox", searchCoins(coinArr));
});
function searchCoins(coinArr) {
  coinArr.forEach((coin) => {
    domUi.displaySearch(coin);
  });
}
// Display and undisplay search bar results ------------------- { search bar }
displaySearchResults();
document.addEventListener("click", () => {
  searchResults();
});
// add coin capabilities
document.getElementById("tableNone").addEventListener("click", (e) => {
  let singleCoinSearch;
  if (e.target.classList.contains("h5el")) {
    singleCoinSearch = e.target.textContent;
    // console.log(e.target.textContent);
  } else if (e.target.classList.contains("spanel")) {
    singleCoinSearch = e.target.parentElement.children[0].textContent;
    // console.log(e.target.parentElement.children[0].textContent);
  } else if (e.target.classList.contains("trel")) {
    singleCoinSearch =
      e.target.firstElementChild.firstElementChild.firstElementChild
        .textContent;
    // console.log(
    //   e.target.firstElementChild.firstElementChild.firstElementChild.textContent
    // );
  }
  marketApi.getCoinData(singleCoinSearch.trim()).then((data) => {
    console.log("Coin Data", data.coinDataJson);
    domUi.displayPortfolio(data.coinDataJson);
    //   domUi.leaderModal(data.coinDataJson);
    //   charts.generateSingleChart(data.coinChartJson);
  });
  // console.log(e.target);
});
