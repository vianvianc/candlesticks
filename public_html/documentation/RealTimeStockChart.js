define(["require", "exports", 'Scripts/MindFusion.Charting'], function (require, exports, m) {
   "use strict" ;
   let Charting = m.MindFusion.Charting;
   let Controls = m.MindFusion.Charting.Controls;
   let Collections = m.MindFusion.Charting.Collections;
   let Drawing = m.MindFusion.Charting.Drawing;

   let stockChart = new Controls.CandlestickChart(document.getElementById('stockChart'));
   stockChart.title = "AAPL";
   stockChart.theme.titleFontSize = 16;

   stockChart.candlestickWidth = 12;

   stockChart.showLegend = false;
   stockChart.showXCoordinates = false;
   stockChart.xAxis.minValue = 0;
   stockChart.xAxis.interval = 1;
   stockChart.xAxis.maxValue = 40;
   stockChart.xAxis.title = "Time";
   stockChart.yAxis.title = "Price";
/*
   stockChart.gridType = Charting.gridType.Horizontal;
   stockChart.theme.gridColor1 = new Drawing.Color("#ffffff");
   stockChart.theme.gridColor2 = new Drawing.Color("#fafafa");
   stockChart.theme.gridLineColor = new Drawing.Color("#cecece");
   stockChart.theme.gridLineStyle = new Drawing.Dash;

*/


   let dataList = new Collections.List();
   updateStock();

   function updateStock()
   {
      $.getJSON("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&apikey=6VD45ZWE08EC0J3H", function(json) {
         let times = json["Time Series (1min)"];
         let update = false;
         if (stockChart.series.count() > 0 )
             update = true;
            for (let time in times){
               let stock_info = times[time];
               let dataItem = new Charting.StockPrice(stock_info["1. open"], stock_info["4. close"], stock_info["3. low"], stock_info["2. high"], new Date(time));

               dataList.add(dataItem);
            }
            let series = new Charting.StockPriceSeries(dataList);
            series.dateTimeFormat = Charting.DateTimeFormat.ShortTime;

            let data = new Collections.ObservableCollection();
            data.add(series);
            stockChart.series = data;
            stockChart.draw();
      })
   }


});