// Contract Address Shortener -------------------------- { Shortener }
function contractShortener(contract) {
  if (contract.length <= 3) {
    return "";
  } else {
    return contract.slice(0, 4) + "..." + contract.slice(-4);
  }
  //   console.log("Contract", contract);
}

// Precentage Calculator  -------------------------- { Precentage }
function calculatePrecentage(amount, total) {
  return Math.round((amount / total) * 100);
}

// URL String Shortener -------------------------- { Shortener } --- WOrk on this
function shortenUrlString(url) {
  return url.replace("https://", "").replace("/", "").replace("http:/", "");
}

// Number with commas -------------------------- { Commas } --- WOrk on this
function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Sort Price Change Precentage DESC  ------------------------------- { Helper Function }
function sortDataLow(arr) {
  const sortCoinss = arr.sort((a, b) => {
    return a.price_change_percentage_24h - b.price_change_percentage_24h;
  });
  return sortCoinss;
}

// Sort Price Change Precentage ASC  ------------------------------- { Helper Function  }
function sortDataGrow(arr) {
  const sortCoinss = arr.sort((a, b) => {
    return b.price_change_percentage_24h - a.price_change_percentage_24h;
  });
  return sortCoinss;
}
// UpperCase first coin letter ----------------------- { Capitalize }
function coinCapitalized(coin) {
  return coin.charAt(0).toUpperCase() + coin.slice(1);
}
// WatchList Class for Local Storage Coins ------------------- { WatchList }
function storedCoinsClass(coin) {
  let tokenClass;
  const storedCoins = storage.getStoredData();
  const lowerCasedCoins = storedCoins.map((coin) => {
    return coin.toLowerCase();
  });
  if (lowerCasedCoins.includes(coin)) {
    return (tokenClass = "starActive");
  } else {
    return (tokenClass = "");
  }
}
