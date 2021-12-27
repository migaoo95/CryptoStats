// Init Classes ---------------------- { Init }
const marketApi = new ApiData();
const domUi = new DomUI();
const storage = new Store();
const charts = new Charts();

// Modal LeaderBoard Event Trigger --------------------------------- { Leader Modal }
document.querySelector(".row").addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("card-leader")) {
    marketApi
      .getCoinData(e.target.parentElement.children[1].textContent.toLowerCase())
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log(data.coinChartJson);
        // console.log(data.coinDataJson);
      });
  } else if (e.target.parentElement.classList.contains("h6")) {
    marketApi
      .getCoinData(
        e.target.parentElement.parentElement.children[1].textContent.toLowerCase()
      )
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log(data.coinChartJson);
        // console.log(data.coinDataJson);
      });
  } else if (e.target.parentElement.classList.contains("cardDiv")) {
    marketApi
      .getCoinData(
        e.target.parentElement.children[1].children[1].textContent.toLowerCase()
      )
      .then((data) => {
        domUi.leaderModal(data.coinDataJson);
        charts.generateSingleChart(data.coinChartJson);
        console.log(data.coinChartJson);
        // console.log(data.coinDataJson);
      });
  }
  //   console.log(e.target.parentElement);
});

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
marketApi
  .getData()
  .then((data) => {
    console.log(data.marketDataJson);
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

// Simple Accordion anim ----------------------- { Accordion }
document.getElementById("leaderModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("acc")) {
    document.getElementById("accArrow").className =
      "fas fa-arrow-alt-circle-down";
    e.target.classList.remove("acc");
  } else {
    document.getElementById("accArrow").className =
      "fas fa-arrow-alt-circle-right";
    e.target.classList.add("acc");
  }

  console.log(e.target);
});

// Change Time Stamp Click Event ----------------------- { TimeStamp }
document.getElementById("lModalBody").addEventListener("click", (e) => {
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
// // Calculator
// let total = 3000;
// let amount = 100;

// function calculateProcent(total, amount) {
//   const result = (amount / total) * 100;
//   console.log(result, "%");
// }
// calculateProcent(total, amount);
