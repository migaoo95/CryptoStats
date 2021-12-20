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
}
