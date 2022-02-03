// Init Classes ---------------------- { Init }
const marketApi = new ApiData();
const domUi = new DomUI();
const storage = new Store();
const charts = new Charts();
console.log(window.location);
// Page Current
if (window.location.pathname.includes("index.html")) {
  document.querySelectorAll(".l1").forEach((li) => {
    li.classList.remove("text-muted");
    li.classList.add("text-primary");
  });
} else {
}

// Spinner
let spinner = true;
// Modal LeaderBoard Event Trigger --------------------------------- { Leader Modal }
document.querySelector(".row").addEventListener("click", (e) => {
  modalShared(e);
});
//   console.log(e.target.parentElement);
// watch;
// Get Api object on load ------------------------- { Promise }
marketApi
  .getData()
  .then((data) => {
    console.log("Market Data", data.marketDataJson);
    // console.log("Global Data", data.globalDataJson);
    // Display global Data ------------------------ { Global Data }
    domUi.displayGlobalData(data.globalDataJson);
    const slicedArray = sortDataLow(data.marketDataJsonAll).slice(0, 3);
    const newSliced = sortDataLow(data.marketDataJsonAll).slice(-3).reverse();
    // SORT GAINERS
    slicedArray.forEach((coin, index) => {
      domUi.displayLoosers(coin, index);
    });
    // SORT LOOSERS
    newSliced.forEach((coin, index) => {
      domUi.displayGainers(coin, index);
    });

    // ForEach data recived call UI method -------------------------- { LeaderBoard }
    data.marketDataJson.forEach((currency, index) => {
      domUi.createLeaderBoard(currency, index);

      //   console.log("Here", data.marketDataJson.length); // Here
    });
    return data;
  })
  .then((data) => {
    // console.log(data.marketDataJson);
    spinner = false;
    hideSpinner();
    charts.generateCharts(data.marketDataJson);
  });

// Change amount of coins displaied within Leaderboard -------------------------- { Change LeaderBoard }
document.getElementById("ranking").addEventListener("change", (e) => {
  document.querySelector(".spinner-leader").style.display = "block";
  marketApi.changeRanking(e.target.value);
  domUi.refresh();
  marketApi
    .getData()
    .then((data) => {
      data.marketDataJson.forEach((currency, index) => {
        domUi.createLeaderBoard(currency, index);
      });

      return data;
    })
    .then((data) => {
      charts.generateCharts(data.marketDataJson);
    })
    .then(() => {
      document.querySelector(".spinner-leader").style.display = "none";
    });
});
// Watchlist event for LeaderBoard -------------------------- { WatchList LeaderBoard }
document.getElementById("row").addEventListener("click", (e) => {
  let page = "dash";
  singleCoinWatch(e, page);
});

// MODAL  ------------------------------- { Event Modal }
document.querySelectorAll("#linkMore").forEach((link) => {
  link.addEventListener("click", (e) => {
    document.getElementById("spinner-modal").style.display = "block";
    let headers;
    if (e.target.classList.contains("lLink")) {
      headers = true;
    } else {
      headers = false;
    }
    domUi.refreshModal();
    domUi.changeHeader(headers);
    marketApi
      .getData()
      .then((data) => {
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
      })
      .then(() => {
        document.getElementById("spinner-modal").style.display = "none";
      });
  });
});

// Chart Timestamp, Watchlist in modal, Clipboard ----------------- { Shared }
document.getElementById("lModalBody").addEventListener("click", (e) => {
  watchListShared(e);
});

// Gainers Loosers Table ------------------------------- { Gainers / Losers Modal }
document.querySelectorAll("#gLModal").forEach((table) => {
  table.addEventListener("click", (e) => {
    let coinName;
    if (e.target.id == "spanPro") {
      coinName =
        e.target.parentElement.parentElement.children[0].children[2]
          .textContent;
    } else if (e.target.tagName == "SPAN" || e.target.tagName == "IMG") {
      coinName = e.target.parentElement.children[2].textContent;
    } else if (e.target.tagName == "TD") {
      coinName = e.target.children[2].textContent;
    }
    //   console.log(coinName.length, coinName.trim());
    marketApi.getCoinData(coinName.trim()).then((data) => {
      console.log(data.coinDataJson);
      domUi.leaderModal(data.coinDataJson);
      charts.generateSingleChart(data.coinChartJson);
    });
  });
});

// Gainers Loosers Table ------------------------------- { Gainers / Losers Modal out Modal }
document.getElementById("modalTable").addEventListener("click", (e) => {
  let coinName;
  if (e.target.id == "spanPro") {
    coinName =
      e.target.parentElement.parentElement.children[0].children[2].textContent;
  } else if (e.target.tagName == "SPAN" || e.target.tagName == "IMG") {
    coinName = e.target.parentElement.children[2].textContent;
  } else if (e.target.tagName == "TD") {
    coinName = e.target.children[2].textContent;
  }
  //   console.log(coinName.length, coinName.trim());
  marketApi.getCoinData(coinName.trim()).then((data) => {
    console.log(data.coinDataJson);
    domUi.leaderModal(data.coinDataJson);
    charts.generateSingleChart(data.coinChartJson);
  });
});
// Search Box ------------------------------ { Search Box }
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
const tableNone = document.getElementById("tableNone");
document.getElementById("searchBox").addEventListener("keyup", (e) => {
  if (e.target.value != "") {
    tableNone.setAttribute("class", "");
    document.querySelectorAll("#allTr").forEach((el) => {
      if (el.textContent.indexOf(e.target.value) != -1) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
    // console.log(tableNone);
  } else {
    tableNone.setAttribute("class", "d-none");
  }

  //   console.log(e.target);
});
// coinArr.forEach((coin) => {
//   console.log(coin);
// });
// document.getElementById("searchBox").addEventListener("focus", (e) => {
//   marketApi.getData().then((data) => {
//     // console.log(data.marketDataJsonAll);
//     data.marketDataJsonAll.forEach((coin) => {
//       domUi.displaySearch(coin.id, "block");
//     });
//     e.target.addEventListener("keyup", (e) => {
//       document.querySelectorAll("#searchBoxZ").forEach((el) => {
//         if (e.target.value != "") {
//           if (el.textContent.indexOf(e.target.value.trim()) != -1) {
//             el.style.display = "block";
//           } else {
//             el.style.display = "none";
//           }
//         } else {
//           document.querySelectorAll("#searchBoxZ").forEach((el) => {
//             el.style.display = "none";
//           });
//           console.log("empty");
//           // domUi.hideSearch();
//         }
//       });
//       // document.getElementById("searchBoxContainer").innerHTML = "";

//       //   console.log(document.querySelectorAll("#searchBoxZ"));
//     });
//   });
// });
// domUi.displaySearch(e.target.value);
//   } else {
//     // domUi.hideSearch();
//   }
// const element = document.getElementById("searchBox");
// element.addEventListener('click')
// if (element.activeElement) {
//   console.log("yyyyyeheh");
// } else {
//   console.log("sadsda");
// }
// Display Search Results  ------------------ { shared.js }
displaySearchResults();
// Clear Search Result on Click out ------------------ { shared.js }
document.addEventListener("click", () => {
  searchResults();
});

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
    // console.log(data.coinDataJson);
    domUi.leaderModal(data.coinDataJson);
    charts.generateSingleChart(data.coinChartJson);
  });
  // console.log(e.target);
});
// Show and hide spinners ------------------ { Spinner }
function hideSpinner() {
  if (spinner) {
    document.querySelectorAll(".spinner-el").forEach((el) => {
      el.style.display = "block";
    });
  } else {
    document.querySelectorAll(".spinner-el").forEach((el) => {
      el.style.display = "none";
    });
  }
}
