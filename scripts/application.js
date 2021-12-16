// Init Api Class
const marketApi = new ApiData();
// Init Dom Ui Class
const domUi = new DomUI();
marketApi.getData().then((data) => {
  data.marketDataJson.forEach((currency) => {
    console.log(currency);
    domUi.createElemet(currency);
  });
});
