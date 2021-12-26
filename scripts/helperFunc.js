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
