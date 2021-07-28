var universeChartSeries = [ ]
var indexChartSeries = [ ]

$.getJSON({
   url: '/datasets/UNIVERSE2.json'
}).done(function (result, status, xhr) {
   const rawUniverseData = xhr.responseJSON;
   universeChartSeries = processDataSet(rawUniverseData);
   startChart()
}).fail(function (xhr, status, error) {
   console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
});
$.getJSON({
   url: '/datasets/INDEX2.json'
}).done(function (result, status, xhr) {
   const rawIndexData = xhr.responseJSON;
   indexChartSeries = processDataSet(rawIndexData);
   startChart()
}).fail(function (xhr, status, error) {
   console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
});
$.getJSON({
   url: '/datasets/EARTH2.json'
}).done(function (result, status, xhr) {
   const rawIndexData = xhr.responseJSON;
   earthChartSeries = processDataSet(rawIndexData);
   startChart()
}).fail(function (xhr, status, error) {
   console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
});

function processDataSet(dataSet) {
   const outputData = [ ];

   dataSet.forEach((row) => {
      outputData.push([
         new Date(row.date).getTime(),
         parseFloat(row.aud_price)
      ]);
   });

   return outputData;
};

function startChart() {
   var chart = new Highcharts.StockChart({
         chart: {
            renderTo: 'container'
         },
         title: {
            text: 'Spaceship Voyager'
         },
         xAxis: {
            type: 'date'
         },
         rangeSelector: {
         buttons: [{
            type: 'day',
            count: 7,
            text: '1w'
         }, {
            type: 'month',
            count: 1,
            text: '1m'
         }, {
            type: 'month',
            count: 3,
            text: '3m'
         }, {
            type: 'month',
            count: 6,
            text: '6m'
         }, {
            type: 'year',
            count: 1,
            text: '1y'
         }, {
            type: 'all',
            text: 'All'
         }],
         selected: 5
         },
         series: [{
            name: 'UNIVERSE',
            data: universeChartSeries
         }, {
            name: 'ORIGIN (INDEX)',
            data: indexChartSeries
         }, {
            name: 'EARTH',
            data: earthChartSeries
         }]
   });
};
