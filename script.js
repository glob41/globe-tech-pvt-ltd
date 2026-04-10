
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  width: window.innerWidth,
  height: 400,
});

const candleSeries = chart.addCandlestickSeries();

fetch("https://your-render-api-url")
.then(res => res.json())
.then(data => {

  const formattedData = data.map(item => ({
    time: item.time,
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close
  }));

  candleSeries.setData(formattedData);
});
