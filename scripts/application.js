// Init Api Class
const marketApi = new ApiData();
// Init Dom Ui Class
const domUi = new DomUI();
// Init LocalStorage Class
const storage = new Store();

// Sort Price Change Precentage DESC  ------------------------------- { Helper Function }
function sortDataLow(arr) {
  const sortCoinss = arr.sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h;
  });
  return sortCoinss;
}
// Sort Price Change Precentage ASC  ------------------------------- { Helper Function  }
function sortDataGrow(arr) {
  const sortCoinss = arr.sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  });
  return sortCoinss;
}
// Get Api object on load ------------------------- { Promise }
marketApi.getData().then((data) => {
  //   Sort Gainers and Losers Data and Display in the DOM ------------------------- { Gainers / Losers }
  const slicedArray = sortDataLow(data.marketDataJsonAll).slice(0, 3);
  const newSliced = sortDataLow(data.marketDataJsonAll).slice(-3).reverse();
  // GAINERS
  slicedArray.forEach((coin, index) => {
    domUi.displayLoosers(coin, index);
  });
  //   LOOSERS
  newSliced.forEach((coin, index) => {
    domUi.displayGainers(coin, index);
  });
  // ForEach data recived call UI method -------------------------- { LeaderBoard }
  data.marketDataJson.forEach((currency, index) => {
    domUi.createLeaderBoard(currency, index);
  });
});
// Change amount of coins displaied within Leaderboard -------------------------- { Change LeaderBoard }
document.getElementById("ranking").addEventListener("change", (e) => {
  marketApi.changeRanking(e.target.value);
  domUi.refresh();
  marketApi.getData().then((data) => {
    data.marketDataJson.forEach((currency, index) => {
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
  }
});
// MODAL  ------------------------------- { Event Modal }
document.querySelectorAll("#linkMore").forEach((link) => {
  link.addEventListener("click", (e) => {
    let headers;
    if (e.target.classList.contains("lLink")) {
      headers = true;
    } else {
      headers = false;
    }

    domUi.refreshModal();
    domUi.changeHeader(headers);
    marketApi.getData().then((data) => {
      if (e.target.classList.contains("lLink")) {
        const slicedArray = sortDataLow(data.marketDataJsonAll).slice(0, 50);
        slicedArray.forEach((coin, index) => {
          if (coin.price_change_percentage_24h < 0) {
            domUi.displayInModal(coin, index, false, true);
          }
        });
      } else {
        const slicedArray = sortDataGrow(data.marketDataJsonAll).slice(0, 50);
        slicedArray.forEach((coin, index) => {
          domUi.displayInModal(coin, index, true, false);
        });
      }
    });
  });
});
