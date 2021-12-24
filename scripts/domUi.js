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
      <div 
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
  // Generate Charts ------------------------------------ { Charts }
  generateCharts(data) {
    const canvases = document.querySelectorAll(".canvases");
    // console.log("Data", data);
    canvases.forEach((canvas, index) => {
      // Price of each coin --------------- {}
      const sevenDayPrice = document
        .getElementById(`myChart${index}`)
        .parentElement.getElementsByTagName("h6")[3]
        .getElementsByTagName("span")[1].textContent;
      // If statement
      let color;
      const stetement = sevenDayPrice < 0 ? (color = "red") : (color = "green");
      // console.log("My Tag", sevenDayPrice);
      const ctx = document.getElementById(`myChart${index}`).getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: data[index].sparkline_in_7d.price,
          datasets: [
            {
              label: "# of Votes",
              data: data[index].sparkline_in_7d.price,
              backgroundColor: [color],
              borderColor: [color],
              borderWidth: 0.5,
            },
          ],
        },
        options: {
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              // Hide grid Lines y axis
              display: false,
            },
            // Hide grid Lines x axis
            x: {
              display: false,
            },
          },
          plugins: {
            // Remove tooltips
            tooltip: {
              enabled: false,
            },
            // Remove legend
            legend: {
              display: false,
            },
            // Remove grid
            gridlines: {
              display: false,
            },
          },
        },
      });
      // console.log(myChart);

      // console.log(canvas);
    });
  }
  // generateChart(data, iterator) {
  //   const ctx = document.getElementById(`myChart${iterator}`).getContext("2d");
  //   const rounded = data.sparkline_in_7d.price.map((entry) => {
  //     return Math.round(entry);
  //   });
  // const myChart = new Chart(ctx, {
  //   type: "line",
  //   data: {
  //     labels: rounded,
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: rounded,
  //         backgroundColor: ["rgba(255, 99, 132, 0.2)"],
  //         borderColor: ["rgba(255, 99, 132, 1)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     elements: {
  //       point: {
  //         radius: 0,
  //       },
  //     },
  //     scales: {
  //       y: {
  //         beginAtZero: false,
  //         // Hide grid Lines y axis
  //         display: false,
  //       },
  //       // Hide grid Lines x axis
  //       x: {
  //         display: false,
  //       },
  //     },
  //     plugins: {
  //       // Remove tooltips
  //       tooltip: {
  //         enabled: false,
  //       },
  //       // Remove legend
  //       legend: {
  //         display: false,
  //       },
  //       // Remove grid
  //       gridlines: {
  //         display: false,
  //       },
  //     },
  //   },
  // });
  // console.log(myChart);

  // console.log(rounded);
  // const ctx = document.getElementById("myChart").getContext("2d");

  // console.log(myChart);
  // const myChart = new Chart(ctx, config);
  // return myChart;
  // }
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
  // LeaderBoard Modal ---------------------------------- { Leader Modal }
  leaderModal(coin) {
    console.log(coin.image);
    this.leaderModalHeader.innerHTML = `
    <h4 class="">${
      coin.id
    }</h4><h5 class="text-muted ml-2 pt-1">${coin.symbol.toUpperCase()}</h5>
    `;
    this.leaderModalBody.innerHTML = `
  <div class="row">
    <div class="col-6">
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
    <span><i style="vertical-align: middle; font-size:20px;" class="star far fa-star mt-1 ml-1 p-1 text-muted"></i></span>
    </div>

    <div class="d-flex">
    <h2><span class="mr-1">$</span>${coin.market_data.current_price.usd}</h2>
<div id="divProBox" >
    <span id="bgPro" class="rounded ml-2 text-white p-2 position-relative"><i style="vertical-aling:middle;" class="mt-1 mr-1 fas fa-chevron-down"></i>${coin.market_data.price_change_percentage_24h.toFixed(
      2
    )}%</span>
    </div>
    </div>

    </div>
    <div class="col-6"></div>
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
