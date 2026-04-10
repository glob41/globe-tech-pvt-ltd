function showChart(name){
  let symbol = "NSE:NIFTY";

  if(name === "BANKNIFTY") symbol = "NSE:BANKNIFTY";
  if(name === "FINNIFTY") symbol = "NSE:FINNIFTY";
  if(name === "SENSEX") symbol = "BSE:SENSEX";

  document.getElementById("chartBox").style.display = "block";
  document.getElementById("tv_chart").innerHTML = "";

  new TradingView.widget({
    width: "100%",
    height: 400,
    symbol: symbol,
    interval: "1",
    timezone: "Asia/Kolkata",
    theme: "dark",
    style: "1",
    container_id: "tv_chart"
  });
}
