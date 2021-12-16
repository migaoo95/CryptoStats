// Init Api Class
const marketApi = new ApiData();

marketApi.getData().then((data) => console.log(data.marketDataJson));
