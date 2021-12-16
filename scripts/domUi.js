class DomUI {
  constructor() {
    this.row = document.getElementById("row");
  }
  static calcPrecentage(currency) {
    const resultPrecentage =
      Math.round(currency.price_change_percentage_24h * 100) / 100;
  }
  createElemet(currency) {
    console.log(Math.round(currency.price_change_percentage_24h * 100) / 100);
    this.row.innerHTML += `
    <div class="col-lg-3 col-md-6 mb-5">
    <div class="card">
      <div class="card-body text-center">
        <img style="margin-top: -50px"
          src="${currency.image}"
          alt=""
          class="img-fluid rounded-circle w-50 mb-3"
        />
        <h5>${currency.id}</h5>
        <h5 class="">${
          currency.current_price
        } <span class="text-success">$</span></h5>
        <h5><span>1h: </span> <span class="${
          currency.price_change_percentage_24h >= 0
            ? "text-success"
            : "text-danger"
        }">${
      Math.round(currency.price_change_percentage_24h * 100) / 100
    }%</span></h5>
        <h5><span>24h: </span> <span class="${
          currency.price_change_percentage_24h >= 0
            ? "text-success"
            : "text-danger"
        }">${
      Math.round(currency.price_change_percentage_24h * 100) / 100
    }%</span></h5>
      
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
