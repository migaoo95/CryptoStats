class DomUI {
  constructor() {
    this.row = document.getElementById("row");
  }
  createElemet(currency) {
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
        <h5 class="text-muted">${currency.current_price} <span class="text-success">$</span></h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
          commodi nostrum, ab libero voluptas officia.
        </p>
      
        </div>
      </div>
    </div>
  </div>
    `;
  }
}
