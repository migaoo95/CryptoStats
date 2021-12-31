// Init Classes ---------------------- { Init }
const marketApi = new ApiData();
const domUi = new DomUI();
const storage = new Store();
const charts = new Charts();

// Modal LeaderBoard Event Trigger --------------------------------- { Leader Modal }
document.querySelector(".row").addEventListener("click", (e) => {
  //   console.log(e.target);
  if (e.target.parentElement.classList.contains("card-leader")) {
    let watchList;

    marketApi
      .getCoinData(e.target.parentElement.children[1].textContent.toLowerCase())
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log("Coin Data", data.coinDataJson);
        return e.target.parentElement.children[1].textContent;
        // console.log(data.coinDataJson);
      })
      .then((data) => {
        if (storage.getStoredData().includes(data)) {
          document.getElementById("starModal").classList.add("starActive");
        }
      });
  } else if (e.target.parentElement.classList.contains("h6")) {
    marketApi
      .getCoinData(
        e.target.parentElement.parentElement.children[1].textContent.toLowerCase()
      )
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log("Coin Data", data.coinDataJson);
        return e.target.parentElement.parentElement.children[1].textContent;
        // console.log(data.coinDataJson);
      })
      .then((data) => {
        if (storage.getStoredData().includes(data)) {
          document.getElementById("starModal").classList.add("starActive");
        }
      });
  } else if (e.target.parentElement.classList.contains("cardDiv")) {
    marketApi
      .getCoinData(
        e.target.parentElement.children[1].children[1].textContent.toLowerCase()
      )
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log("Coin Data", data.coinDataJson);
        // return e.target.parentElement.children[1].children[1].textContent;
        // console.log(data.coinDataJson);
      });
    //   .then((data) => {
    //     if (storage.getStoredData().includes(data)) {
    //       document.getElementById("starModal").classList.add("starActive");
    //     }
    //   });
  }
  //   console.log(e.target.parentElement);
});

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
    charts.generateCharts(data.marketDataJson);
  });

// Change amount of coins displaied within Leaderboard -------------------------- { Change LeaderBoard }
document.getElementById("ranking").addEventListener("change", (e) => {
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
    });
});
// Watchlist event for LeaderBoard -------------------------- { WatchList LeaderBoard }
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

// LeaderBoard Modal Click Event ----------------------- { TimeStamp, Watchlist }
document.getElementById("lModalBody").addEventListener("click", (e) => {
  // Update Watchlist  ---- { WatchList }
  if (e.target.id == "starModal") {
    console.log("This el", e.target);
    let toeknTarget;
    const watchListTokens = document.querySelectorAll("#leaderCard");
    watchListTokens.forEach((token) => {
      if (
        token.firstElementChild.children[1].children[1].textContent ==
        e.target.parentElement.parentElement.children[1].textContent
      ) {
        domUi.watchList(token.firstElementChild.children[0].children[1]);
      }
    });
    storage.addCoinToStorage(
      e.target.parentElement.parentElement.children[1].textContent
    );
    domUi.watchList(e.target);
  }
  // Copy Currency Address to ClipBoard ----
  if (e.target.id == "iconC") {
    const clip = document.createElement("input");
    document.body.appendChild(clip);
    clip.setAttribute("id", "clip_id");
    document.getElementById("clip_id").value =
      e.target.parentElement.firstElementChild.value;
    clip.select();
    document.execCommand("copy");
    document.body.removeChild(clip);
  }
  // Darw a Chart inside a modal  -----
  if (e.target.classList.contains("btnChangeTime")) {
    marketApi.changeChartTimeStamp(e.target.value);
    marketApi
      .getCoinData(e.target.parentElement.parentElement.children[0].textContent)
      .then((data) => {
        document.getElementById("myChartBoard").remove();
        document.getElementById("chartBox").innerHTML =
          ' <canvas class="canvases" style="cursor: pointer;" id="myChartBoard"></canvas>';
        return data;
        // document.getElementById("myChartBoard").innerHTML = "";
      })
      .then((data) => {
        charts.generateSingleChart(data.coinChartJson);
      });
    // e.target.parentElement.parentElement.children[0].textContent
  }
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
document.addEventListener("click", () => {
  if (document.activeElement) {
    tableNone.setAttribute("class", "d-none");
    document.getElementById("searchBox").value = "";
  } else {
    console.log("wyf");
  }
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
