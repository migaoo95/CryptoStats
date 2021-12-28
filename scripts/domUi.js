// Init Storage ----
const storageDom = new Store();
// Class
class DomUI {
  constructor() {
    this.leaderBoard = document.getElementById("row");
    this.gainers = document.getElementById("gainersTable");
    this.losers = document.getElementById("losersTable");
    this.modalHeader = document.querySelector(".modal-header");
    this.modalTable = document.querySelector("#modalTable");
    this.progressBar = document.getElementById("progress");
    // this.leaderModalTitle = document.getElementById("modal-title");
    this.leaderModalBody = document.getElementById("lModalBody");
    this.leaderModalHeader = document.getElementById("lModalHeader");
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
  // Check THis -------------------------- { CHECK }  -------
  watchListClasses(allTokens) {
    // console.log(allTokens);
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
    <div id="leaderCard" class="col-lg-3 col-md-6 mb-5" >
    <div class="card cardDiv">
   <div class="d-flex justify-content-between position-absolute w-100">
    <h6 class="h6 m-1 p-1">${index + 1}</h6>
    <i style="vertical-align: middle; font-size:20px;" class="${tokenClass} star far fa-star mt-1 p-1 text-muted"></i>
    </div>
      <div data-toggle="modal"
      data-target="#leaderModal" class="card-leader card-body text-center">
        <img style="margin-top: -50px"
          src="${currency.image}"
          alt=""
          class="img-fluid rounded-circle w-50 mb-3"
        />
       
        <h6 class="h6">${coinCapitalized}</h6>
        <h6 class="h6">${
          currency.current_price
        } <span class="h6 text-success">$</span></h6>
        <h6 class="h6"><span class="h6" span>24h: </span> <span class="${
          currency.price_change_percentage_24h >= 0
            ? "text-success"
            : "text-danger"
        }">${
      Math.round(currency.price_change_percentage_24h * 100) / 100
    }%</span></h6>
         <h6><span>7d: </span> <span class="${
           currency.price_change_percentage_7d_in_currency >= 0
             ? "text-success"
             : "text-danger"
         }">${
      Math.round(currency.price_change_percentage_7d_in_currency * 100) / 100
    }</span><span class="${
      currency.price_change_percentage_7d_in_currency >= 0
        ? "text-success"
        : "text-danger"
    }">%</span></h6>

      <canvas class="canvases" id="myChart${index}"></canvas>
      
        </div>
      </div>
    </div>
  </div>
    `;
    // this.generateCharts(index);
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

  // Contracts in Selects ---------------------------------- { Contracts Helper }
  outputContracts(contracts) {
    const contractss = document.getElementById("contracts");
    // Convert Object into Array
    const arr = Object.entries(contracts);
    // console.log(arr);
    let select;
    arr.forEach((entry) => {
      if (entry[1] > 3) {
        select += `<option value="${entry[1]}"><span class="text-muted">${
          entry[0]
        }</span> ${contractShortener(entry[1])}</option>`;
      }
      // console.log(entry);
    });
    return select;
    // console.log(arr);
    // contracts.forEach((contract) => {
    //   console.log(contract);
    // });
  }

  // Refresh LeaderBoard Modal ---------------------------------- { Leader Refresh }
  // refreshLeader() {
  //   this.leaderModalHeader.innerHTML = "";
  //   this.leaderModalBody.innerHTML = "";
  // }

  // LeaderBoard Modal ---------------------------------- { Leader Modal }
  leaderModal(coin) {
    // console.log(coin.image);
    this.leaderModalHeader.innerHTML = `
    <h4 class="">${
      coin.id
    }</h4><h5 class="text-muted ml-2 pt-1">${coin.symbol.toUpperCase()}</h5>
    `;
    this.leaderModalBody.innerHTML = `
  <div class="row">
    <div class="col-6 px-5">
    <div class="mb-3">
    <span class="bg-dark p-1 rounded text-white">Rank #${
      coin.market_cap_rank
    }</span></div>
    <div class="d-flex">
    <img id="d-image" class="img-fluid" src="${coin.image.small}">
    <h5 class="pt-2 ml-2">${coin.id}</h5>
    <div class="position-relative mt-2">
    <span class="ml-2 text-muted position-relative p-1 bg-light">${coin.symbol.toUpperCase()}</span>
    
    </div>
    <span><i id="starModal" style="vertical-align: middle; font-size:20px;" class="star far fa-star mt-1 ml-1 p-1 text-muted"></i></span>
    </div>

    <div class="d-flex">
    <h2><span class="mr-1">$</span>${coin.market_data.current_price.usd}</h2>
<div id="divProBox" >
    <span  class="rounded ml-2 ${
      coin.market_data.price_change_percentage_24h.toFixed(2) > 0
        ? "bg-success"
        : "bg-danger"
    } text-white p-2 position-relative"><i style="vertical-aling:middle;" class="mt-1 mr-1 fas fa-chevron-${
      coin.market_data.price_change_percentage_24h.toFixed(2) > 0
        ? "up"
        : "down"
    }"></i>${coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>
    </div>
    </div>
    <div>
    <h6 class="text-muted">Market Cap: <span class="text-dark">$</span> <span class="text-dark">${numberWithCommas(
      coin.market_data.market_cap.usd
    )}</span></h6>
    <h6 class="text-muted">Volume: <span class="text-dark">$</span> <span class="text-dark">${numberWithCommas(
      coin.market_data.total_volume.usd
    )}</span>   </h6>

    </div>
    </div>
    <div class="col-6">
    <span class="mb-2"><a id="website" class="p-1  bg-dark rounded text-white position-relative" target="_blank" href="${
      coin.links.homepage[0]
    }">${shortenUrlString(
      coin.links.homepage[0]
    )} <i class="fas fa-external-link-alt"></i></a></span>


       
          <h6 class="text-muted mt-2">Contracts:</h6>
          <div class="mb-2 d-flex">

         <select class="form-control w-auto" id="contracts">${this.outputContracts(
           coin.platforms
         )}</select> <i id="iconC" class="ml-2 mt-1 text-muted far fa-copy"></i>
    
      </div>
      <div class="border border-info rounded p-1 mb-2" >
      <h6 class="text-muted">Total Supply: <span class="text-dark">${
        coin.market_data.total_supply
      }</span></h6>
      <h6 class="text-muted">Circulating Supply: <span class="text-dark">${
        coin.market_data.circulating_supply
      }</span></h6>
      <div class="progress mt-2">
      
      <div
        class="
          progress-bar
          bg-info
          progress-bar-striped progress-bar-animated
        "
        style="width: ${calculatePrecentage(
          coin.market_data.circulating_supply,
          coin.market_data.total_supply
        )}%"
      >
      ${calculatePrecentage(
        coin.market_data.circulating_supply,
        coin.market_data.total_supply
      )}%
      </div>
      </div>
    </div>
    </div>
   <div class="col-12">
   <div class="card mb-2 mt-2">
   <div class="card-header d-flex">
   <p class=" align-self-center mr-1 h6">${coin.id}</p> 
   <p class=" align-self-center h6">  to USD Chart</p>
   <div class=" ml-auto">
   <button value="1" class="btn btn-secondary btnChangeTime p-1">24h</button>
   <button value="7" class="btn btn-secondary btnChangeTime p-1 ">7D</button>
   <button value="30" class="btn btn-secondary btnChangeTime p-1">1M</button>
   </div>
   </div>
   <div id="chartBox">
   <canvas class="canvases" style="cursor: pointer;" id="myChartBoard"></canvas>
   </div>
   </div>
   
   </div>
    <div class="col-12">
    <div id="accordion">
    <div class="card">
      <div class="card-header text-center">
        <h5 id="accordion">
          <a
            href="#collapse1"
            data-parent="#accordion"
            data-toggle="collapse"
          >
           About <span class="acc">${
             coin.id
           } <i id="accArrow" class="acc fas fa-arrow-alt-circle-right"></i></span>
          </a>
        </h5>
      </div>

      <div id="collapse1" class="collapse">
        <div class="card-body">
        <p class"text-monospace">${coin.description.en}</p>
        </div>
      </div>
    </div>
  </div>
   </div>
    `;
  }
}
