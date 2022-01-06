class Store {
  getStoredData() {
    let stored;
    if (localStorage.getItem("coins") === null) {
      stored = [];
    } else {
      stored = JSON.parse(localStorage.getItem("coins"));
    }
    return stored;
  }
  addCoinToStorage(coin) {
    let stored = this.getStoredData();
    if (stored.includes(coin)) {
      const itemIndex = stored.indexOf(coin);
      stored.splice(itemIndex, 1);
    } else {
      stored.push(coin);
    }
    localStorage.setItem("coins", JSON.stringify(stored));
  }

  // -------------------------------- { Portfolio } -----------------------------------
  ifNotNull() {
    if (localStorage.getItem("holdings")) {
      location.reload;
    }
  }
  // Get Total Holdings Value ----------------- { Total }
  getTotalHoldings() {
    let holdings;
    if (localStorage.getItem("holdings") === null) {
      holdings = [];
    } else {
      holdings = JSON.parse(localStorage.getItem("holdings"));
    }
    return holdings;
  }
  // Update Holdings --------- { Update Holdings }
  updateHoldings(sum, index, array) {
    let storedHoldings = this.getTotalHoldings();
    // console.log("Sum", sum, "Holdings", storedHoldings[index]);
    storedHoldings.push(sum);
    localStorage.setItem("holdings", JSON.stringify(storedHoldings));
    if (index + 1 == array) {
      let total = storedHoldings
        .map((no) => {
          return Number(no);
        })
        .reduce((a, b) => {
          return a + b;
        });

      localStorage.removeItem("holdings");
      console.log("total", total);
      const domUi = new DomUI();
      domUi.displayBalance(total);
    }
  }
  // Get data from portfolio -----
  getPortfolioData() {
    let portfolio;
    if (localStorage.getItem("portfolio") === null) {
      portfolio = [];
    } else {
      portfolio = JSON.parse(localStorage.getItem("portfolio"));
    }
    return portfolio;
  }
  // Add or Update portfolio In Local Storage -------
  updatePortfolioStorage(coinObj, sell) {
    let portfolio = this.getPortfolioData();

    let totalQ;
    // Check if Coin already exists in a portfolio ----- { Check }
    portfolio.forEach((el, index) => {
      if (el.coinName === coinObj.coinName) {
        let elNumber = Number(el.quantity);
        let coinObjNumber = Number(coinObj.quantity);
        totalQ = elNumber + coinObjNumber;
        coinObj.quantity = totalQ;
        portfolio.splice(index, 1);
      }
    });

    portfolio.push(coinObj);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    // this.updateHoldings();
  }
  updatePortfolioStorage(coinObj, sell) {
    let portfolio = this.getPortfolioData();

    let totalQ;
    // Check if Coin already exists in a portfolio ----- { Check }
    portfolio.forEach((el, index) => {
      if (el.coinName === coinObj.coinName) {
        let elNumber = Number(el.quantity);
        let coinObjNumber = Number(coinObj.quantity);
        totalQ = elNumber - coinObjNumber;
        coinObj.quantity = totalQ;
        portfolio.splice(index, 1);
      }
    });

    portfolio.push(coinObj);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    // this.updateHoldings();
  }
  updatePortfolioStorageSell(coinObj, sell) {
    let portfolio = this.getPortfolioData();

    let totalQ;
    // Check if Coin already exists in a portfolio ----- { Check }
    portfolio.forEach((el, index) => {
      if (el.coinName === coinObj.coinName) {
        let elNumber = Number(el.quantity);
        let coinObjNumber = Number(coinObj.quantity);
        totalQ = elNumber - coinObjNumber;
        coinObj.quantity = totalQ;
        portfolio.splice(index, 1);
      }
    });

    portfolio.push(coinObj);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
    // this.updateHoldings();
  }
  removeCoin(coinName) {
    let portfolio = this.getPortfolioData();
    portfolio.forEach((coin, index) => {
      if (coin.quantity <= 0) {
        portfolio.splice(index, 1);
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
      }
    });
  }
}
