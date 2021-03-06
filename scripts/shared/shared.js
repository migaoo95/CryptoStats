// Display All Currency Data In Modal --------------------
function modalShared(e) {
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
      });
  }
}
function watchListShared(e) {
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
    if (!window.location.pathname.includes("/index.html")) {
      domUi.clearLeader(); // Refresh LeaderBoard
      showWatchlistTokens(); // Redraw LeaderBoard
    }
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
}
// SingleCoin => Clear LeaderBoard, Redraw LeaderBoard, Store Coin in LS  --------------- { Single Coin }
function singleCoinWatch(e, page) {
  if (e.target.classList.contains("star")) {
    storage.addCoinToStorage(
      e.target.parentElement.nextElementSibling.childNodes[3].textContent
    );
    domUi.watchList(e.target.parentElement.children[1]);
    if (page == "dash") {
      console.log("dash");
    } else {
      console.log("watch", e.target.parentElement.parentElement);

      domUi.clearLeader(); // Refresh LeaderBoard
      showWatchlistTokens();
    }
  }
}
console.log(window.location.pathname);

// Unclick Search Box resultys ----------------------- { Search Results }
function searchResults() {
  document.addEventListener("click", () => {
    if (document.activeElement) {
      tableNone.setAttribute("class", "d-none");
      document.getElementById("searchBox").value = "";
    } else {
      console.log("wyf");
    }
  });
}
// Display Search Results ----------------------- { Search Results }
function displaySearchResults() {
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
}
