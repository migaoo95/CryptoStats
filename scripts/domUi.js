class DomUI {
  constructor() {
    this.leaderBoard = document.getElementById("row");
    this.gainers = document.getElementById("gainersTable");
    this.losers = document.getElementById("losersTable");
  }

  // Calculate Price Movement precentages
  static calcPrecentage(currency) {
    const resultPrecentage =
      Math.round(currency.price_change_percentage_24h * 100) / 100;
  }
  // Update leaderboard
  refresh() {
    this.leaderBoard.innerHTML = "";
  }

  // Display Cryptocurrencies on leader board  ---------------------------------- { LeaderBoard }
  createLeaderBoard(currency, index) {
    // console.log(Math.round(currency.price_change_percentage_24h * 100) / 100);
    const coinCapitalized =
      currency.id.charAt(0).toUpperCase() + currency.id.slice(1);
    this.leaderBoard.innerHTML += `
    <div class="col-lg-3 col-md-6 mb-5">
    <div class="card">
   <div class="d-flex justify-content-between position-absolute w-100">
    <h6 class="  m-1 p-1">${index + 1}</h6>
    <i style="vertical-align: middle; font-size:20px;" class="star far fa-star mt-1 p-1 text-muted"></i>
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
  displayLoosers(crypto) {
    this.losers.innerHTML += `
    <tr>
  
    <td><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }">${crypto.id} <span class="text-muted">${crypto.symbol}</span></td>
    <td><span class="${
      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
    }">${
      Math.round(crypto.price_change_percentage_24h * 100) / 100
    }%</span></td>
    </tr>
    `;
  }
  // Display gainers Table ---------------------------------- { Gainers }
  displayGainers(crypto) {
    this.gainers.innerHTML += `
    <tr>

    <td><img style="width:30px"  class="img-fluid rounded-circle mr-2"  src="${
      crypto.image
    }">${crypto.id} <span class="text-muted">${crypto.symbol}</span></td>
    <td><span class="${
      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"
    }">${
      Math.round(crypto.price_change_percentage_24h * 100) / 100
    }%</span></td>
    </tr>
    `;
  }
}
