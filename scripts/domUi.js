// // Init Storage ----
// const storageDom = new Store();
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
    this.globalData = document.getElementById("globalDataDiv");
    this.searchBoxContainer = document.getElementById("searchBoxContainer");
    this.portfolioContainer = document.getElementById("portfolioC");
    this.portBody = document.getElementById("portBody");
    this.balance = document.getElementById("balance");
    // this.totalSpent = document.getElementById("totalAmount");
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

  // Clear LeaderBoard on Delete from Watchlist -------------------- { Clear LeaderBoard }
  clearLeader() {
    this.leaderBoard.innerHTML = "";
  }
  // Show Message
  showMsg(msg) {
    this.leaderBoard.innerHTML = `<h4 class=" text-center  ">Sorry, your watchlist is currently empty. You can start by choosing your faviorite cryptocurrencies from the dashboard by pressing a star icon <span><i class="text-warning far fa-star"></i></span></h4>`;
  }
  // Display Cryptocurrencies on leader board  ---------------------------------- { LeaderBoard }
  createLeaderBoard(currency, index) {
    // DOM Output -------- { Output }
    this.leaderBoard.innerHTML += `
    <div id="leaderCard" class="col-md-3 col-sm-4 mb-5 col-6" >
    <div class="card shadow-sm cardDiv">
   <div class="d-flex justify-content-between position-absolute w-100">
    <h6 class="h6 m-1 p-1">${currency.market_cap_rank}</h6>
    <i style="vertical-align: middle; font-size:20px;" class="${storedCoinsClass(
      currency.id
    )} star far fa-star mt-1 p-1 text-muted"></i>
    </div>
      <div data-toggle="modal"
      data-target="#leaderModal" class="card-leader card-body text-center">
        <img style="margin-top: -50px"
          src="${currency.image}"
          alt=""
          class="img-fluid rounded-circle w-50 mb-3"
        />
       
        <h6 class="h6">${coinCapitalized(currency.id)}</h6>
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
         <h6 class="h6"><span class="h6">7d: </span> <span class="${
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
    <tr id="tableRow" data-toggle="modal"
    data-target="#leaderModal">
  
    <td id="tableData"><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }"><span>${
      crypto.id
    } </span><span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td id="tableData"><span id="spanPro" class="${
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
    <tr id="tableRow" data-toggle="modal"
    data-target="#leaderModal">

    <td id="tableData"><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }"><span>${
      crypto.id
    } </span><span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td id="tableData"><span id="spanPro" class="${
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
    <tr id="tableRow" data-toggle="modal"
    data-target="#leaderModal">

    <td id="tableData"><span class="mr-3 text-muted">${
      indexItem + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }"><span>${
      crypto.id
    } </span><span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td id="tableData"><span id="spanPro" class="${
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

  // LeaderBoard Modal ---------------------------------- { Leader Modal }
  leaderModal(coin) {
    this.leaderModalHeader.innerHTML = `
    <h4 class="">${
      coin.id
    }</h4><h5 class="text-muted ml-2 pt-1">${coin.symbol.toUpperCase()}</h5>
    `;
    this.leaderModalBody.innerHTML = `
  <div class="row">
    <div class="col-12 col-md-6 px-5 text-center text-md-left">
    <div class="mb-3">
    <span class="bg-dark p-1 rounded text-white">Rank #${
      coin.market_cap_rank
    }</span></div>
    <div class="d-flex">
    <img id="d-image" class="img-fluid" src="${coin.image.small}">
    <h5 class="pt-2 ml-2">${coinCapitalized(coin.id)}</h5>
    <div class="position-relative mt-2">
    <span class="ml-2 text-muted position-relative p-1 bg-light">${coin.symbol.toUpperCase()}</span>
    
    </div>
    <span><i id="starModal" style="vertical-align: middle; font-size:20px;" class="${storedCoinsClass(
      coin.id
    )} star far fa-star mt-1 ml-1 p-1 text-muted"></i></span>
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
    <div class="col-12 col-md-6 px-5 text-center text-md-left">
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
           Read More About  <span class="acc">${coinCapitalized(
             coin.id
           )} </span>
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
  // Global Cryptocurrency Information ---------------------------- { Global }
  displayGlobalData(data) {
    console.log("Dom Global", data);
    this.globalData.innerHTML = `
    <h6 class=""><i class="d-none d-md-inline fas fa-coins"></i> Currencies<span class="d-none d-md-inline">:</span> <span class="text-info">${
      data.data.active_cryptocurrencies
    }</span></h6>
    <h6><i class="d-none d-md-inline fas fa-poll"></i> <span class="d-none d-md-inline">Total</span> Market Cap<span class="d-none d-md-inline">:</span> <span class="text-info">$${Math.round(
      data.data.total_market_cap.usd
    )}</span></h6>
    <h6><i class="d-none d-md-inline fas fa-cubes"></i> Exchanges<span class="d-none d-md-inline">:</span> <span class="text-info">${
      data.data.markets
    }</span></h6>
    
    `;
  }
  // Search Box  ---------------------------- { Search }
  displaySearch(crypto) {
    this.searchBoxContainer.innerHTML += `
    <tr  id="allTr" class="trel bg-secondary text-white" data-toggle="modal"
    data-target="#leaderModal">

    <td id="searchBoxZ"><h5 class="ml-2"> <span class="h5el">${
      crypto.id
    } </span> <span class="spanel text-info">${crypto.symbol.toUpperCase()}</span></h5></td>
   
    </tr>
    `;

    // console.log(this.searchBoxContainer);
  }
  hideSearch() {
    this.searchBoxContainer.innerHTML = "";
  }
  // Create Portfolio ----------------------------- { Portfolio }
  displayPortfolio(coin, className, quantity) {
    // console.log(coin.image);
    this.portfolioContainer.innerHTML = `
      <div class="row">
      <div class="col-12 d-flex justify-content-center mb-2">
      <div class="btn-toolbar">
      <div id="btn-group" class=" btn-group mr-auto">
          <button onclick="clickBtnOne()" id="buyBuy" onClick data-toggle="button" class="buy btn btn-info text-dark active px-5" type="button"><span class="${className} h6">Buy<span></button>
          <button onclick="clickBtnTwo()" id="buySell" data-toggle="button" class="buy btn btn-info text-dark px-5" type="button"><span class="${className} h6">Sell<span></button>
      </div>
      </div>
      </div>
      <br>
      <div class="col-6 offset-4 pl-4 mt-3">
      
      <div class="d-flex">
      
      <img id="d-image" class="img-fluid" src="${
        className == "buy" ? coin.image.small : ""
      }">
      <h5 id="coinName" class="pt-2 ml-2">${coinCapitalized(coin.id)}</h5>
      
      <div class="position-relative mt-2">
      <span class="ml-2 text-muted position-relative p-1 bg-light">${coin.symbol.toUpperCase()}</span>
      
        </div>
       </div>
       </div>
       </div>
      <div class="row container d-flex justify-content-center mt-3">
      <div class="col-5 pr-1">
      <div class="form-group">
      <label for="quantity">Quantity</label>
      <input type="number" class="quantity form-control" id="quantity" min="0" aria-describedby="quantity" placeholder="0.00">
      <small id="emailHelp" class="form-text text-muted">What is the amount of coins that you would like to add</small>
    </div>
      </div>
  
  
      <div class="col-5 pl-1">
    <div class="form-group">
      <label for="quantity">Price Per Coin</label>
      <input type="number" class="form-control" id="price" aria-describedby="quantity" placeholder="0.00"  value="${
        coin.market_data.current_price.usd
      }">
      <small id="emailHelp" class="form-text text-muted">Current price per token</small>
    </div>
      </div>
      
      <div class="container mt-3 px-5">
      <div id="totalSpent" class=" p-3 mb-3 rounded">
      <h6 class="text-muted">Total Spent</h6>
    
      <h4>$<span id="totalAmount">0</span></h4>
      </div>
      <button class="addTrans btn btn-block btn-primary py-2">Add Transaction</button>
      </div>
      </div>
      `;
  }

  // -------------------------------- { Portfolio } -----------------------------------
  // Balance
  displayBalance(amount) {
    this.balance.innerHTML = `$${amount}`;
  }
  // Name
  changeTotalSpent(total) {
    // this.totalSpent.textContent = total;
    document.getElementById("totalAmount").textContent = total;
    // console.log(this.totalSpent, total);
  }
  displayAssets(crypto, quantity, index) {
    // console.log(holdings);
    console.log(crypto);
    this.portBody.innerHTML += `
    <tr class="" data-toggle="modal"
    data-target="#leaderModal">
  
    <td id="tableData"><span class="h6 mr-3">${
      index + 1
    }</span><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image.thumb
    }"><span>${
      crypto.id
    } </span><span class="text-muted">${crypto.symbol.toUpperCase()}</span></td>
    <td>$${crypto.market_data.current_price.usd}</td>
    <td id="tableData"><span id="spanPro" class="${
      crypto.market_data.price_change_percentage_24h >= 0
        ? "text-success"
        : "text-danger"
    }">${
      Math.round(crypto.market_data.price_change_percentage_24h * 100) / 100
    }%</span></td>
   
    <td>$${
      crypto.market_data.current_price.usd * quantity
    } <br><small class="text-muted">${crypto.symbol.toUpperCase()} ${quantity}</small></td>
    </tr>
    `;
  }
}
