class DomUI {
  constructor() {
    this.leaderBoard = document.getElementById("row");
    this.gainers = document.getElementById("gainersTable");
    this.losers = document.getElementById("losersTable");
    this.modalHeader = document.querySelector(".modal-header");
    this.modalTable = document.querySelector("#modalTable");
  }
  // Update leaderboard
  refresh() {
    this.leaderBoard.innerHTML = "";
  }
  //   ---------------------------------- { WatchList }
  watchList(target) {
    if (target.classList.contains("starActive")) {
      target.classList.remove("starActive");
    } else {
      target.classList.add("starActive");
    }
  }
  watchListClasses(allTokens) {
    console.log(allTokens);
  }
  // Display Cryptocurrencies on leader board  ---------------------------------- { LeaderBoard }
  createLeaderBoard(currency, index) {
    // Assign Class Name -------- { ClassName }
    const store = new Store();
    let tokenClass;
    const storedCoins = storage.getStoredData();
    const lowerCasedCoins = storedCoins.map((coin) => {
      return coin.toLowerCase();
    });
    if (lowerCasedCoins.includes(currency.id)) {
      tokenClass = "starActive";
    } else {
      tokenClass = "";
    }
    // DOM Output -------- { Output }
    const coinCapitalized =
      currency.id.charAt(0).toUpperCase() + currency.id.slice(1);
    this.leaderBoard.innerHTML += `
    <div id="leaderCard" class="col-lg-3 col-md-6 mb-5">
    <div class="card">
   <div class="d-flex justify-content-between position-absolute w-100">
    <h6 class="  m-1 p-1">${index + 1}</h6>
    <i style="vertical-align: middle; font-size:20px;" class="${tokenClass} star far fa-star mt-1 p-1 text-muted"></i>
    </div>
      <div class="card-body text-center">
        <img style="margin-top: -50px"
          src="${currency.image}"
          alt=""
          class="img-fluid rounded-circle w-50 mb-3"
        />
       
        <h6>${coinCapitalized}</h6>
        <h6 class="">${
          currency.current_price
        } <span class="text-success">$</span></h6>
        <h6><span>24h: </span> <span class="${
          currency.price_change_percentage_24h >= 0
            ? "text-success"
            : "text-danger"
        }">${
      Math.round(currency.price_change_percentage_24h * 100) / 100
    }%</span></h6>
        
      
        </div>
      </div>
    </div>
  </div>
    `;
  }
  // Display loosers Table ---------------------------------- { Loosers }
  displayLoosers(crypto, indexItem) {
    this.losers.innerHTML += `
    <tr>
  
    <td><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }">${
      crypto.id
    } <span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td><span class="${
      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
    }">${
      Math.round(crypto.price_change_percentage_24h * 100) / 100
    }%</span></td>
    </tr>
    `;
  }
  // Display gainers Table ---------------------------------- { Gainers }
  displayGainers(crypto, indexItem) {
    this.gainers.innerHTML += `
    <tr>

    <td><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }">${
      crypto.id
    } <span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td><span class="${
      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
    }">${
      Math.round(crypto.price_change_percentage_24h * 100) / 100
    }%</span></td>
    </tr>
    `;
  }
  // Display in Modal ---------------------------------- { Modal }
  refreshModal() {
    this.modalTable.innerHTML = "";
    this.modalHeader.innerHTML = "";
  }
  changeHeader(test) {
    if (test) {
      this.modalHeader.innerHTML = `
      <i style="vertical-align: middle;" class=" pr-3 text-danger fas fa-skull-crossbones fa-2x"></i>
      <h6 class="pr-5 modal-title">Biggest Loosers</h6>`;
    } else {
      this.modalHeader.innerHTML = `
      <i style="vertical-align: middle;" class=" pr-3 text-success fas fa-chart-line fa-2x"></i>
      <h6 class="pr-5 modal-title">Biggest Gainers</h6>`;
    }
  }
  // Display in Modal ---------------------------------- { Modal }
  displayInModal(crypto, indexItem, gainers, losers) {
    this.modalTable.innerHTML += `
    <tr>

    <td><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }">${
      crypto.id
    } <span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td><span class="${
      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
    }">${
      Math.round(crypto.price_change_percentage_24h * 100) / 100
    }%</span></td>
    </tr>
    `;
    // console.log(sortCoinss);
  }
}
