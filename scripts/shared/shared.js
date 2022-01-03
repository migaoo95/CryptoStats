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
// Row element watchlist ---------
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
      domUi.clearLeader();
      globalTest();
    }
  }
}
