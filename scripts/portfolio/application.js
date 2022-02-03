const marketApi = new ApiData();
const domUi = new DomUI();
const storage = new Store();
if (window.location.pathname == "/CryptoStats/pages/portfolio.html") {
  document.querySelectorAll(".l1").forEach((li) => {
    li.classList.remove("text-muted");
    li.classList.add("text-primary");
  });
}
// const portfolio = new Portfolio();
let coinArr = [];
// Get Data for SearchBar ------------------- { Search Bar }
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
// Get Api Data to Display Assets ------------------- { Display Assets }
// portfolioApiCall("hey");
const storedCoins = storage.getPortfolioData();
(function () {
  console.log("sadas");

  storedCoins.forEach((coin, index) => {
    const lowerCoin = coin.coinName.toLowerCase();
    // Fire Api Call
    portfolioApiCall(lowerCoin, coin.quantity, index, storedCoins.length);
  });
})();
function portfolioApiCall(coin, quantity, index, array) {
  marketApi.getCoinData(coin).then((data) => {
    // if (index == array - 1) {
    //   console.log("ajdjaojsdj");
    // }
    console.log(index);
    storage.updateHoldings(
      (quantity * data.coinDataJson.market_data.current_price.usd).toFixed(4),
      index,
      array
    );
    // location.reload();
    // const newArr = storedCoins.map(coin => {
    //   return quantity
    // })
    // console.log(typeof quantity, data.coinDataJson.market_data.current_price.usd);
    if (quantity <= 0) {
      console.log(coin.id);
      storage.removeCoin();
    } else {
      domUi.displayAssets(data.coinDataJson, quantity, index);
    }

    // console.log(data.coinDataJson);
  });
}

// console.log(holdings);

// console.log(storedCoins);
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
  }

  marketApi.getCoinData(singleCoinSearch.trim()).then((data) => {
    console.log("Coin Data", data.coinDataJson);
    domUi.displayPortfolio(data.coinDataJson, "buy");
  });
});

document.getElementById("portfolioModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("quantity")) {
    let price = document.getElementById("price").value;
    let total;
    document.querySelector(".quantity").addEventListener("change", (e) => {
      let quantity = e.target.value;
      total = quantity * price;
      //   console.log(total);
      domUi.changeTotalSpent(total);
    });
    document.querySelector(".quantity").addEventListener("keyup", (e) => {
      let quantity = e.target.value;
      total = quantity * price;
      //   console.log(total);
      domUi.changeTotalSpent(total);
    });
  }
  if (e.target.classList.contains("buy")) {
  }
  if (e.target.classList.contains("addTrans")) {
    if (e.target.classList.contains("buy")) {
      e.target.classList.add("active");
    }
    //   Get User Input
    const totalQuantity = document.querySelector(".quantity").value;
    const coinName = document.getElementById("coinName").textContent;
    const portfolioObj = new Portfolio(coinName, totalQuantity);
    if (document.getElementById("buySell").classList.contains("active")) {
      storage.updatePortfolioStorageSell(portfolioObj);
    } else {
      storage.updatePortfolioStorage(portfolioObj);
    }
    // Call methods

    // domUi.displayBalance();
    location.reload();
  }
});
// domUi.displayBalance(storage.updateHoldings());
