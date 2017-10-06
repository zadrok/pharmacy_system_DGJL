'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {
  $scope.dateFrom = moment().subtract(7,'days').toDate(); //yyyy,m,d
  $scope.dateTo = moment().toDate();
  $scope.sku = null; // Need an input field for this guy like in sales page (TODO : Someone please change this guy to be autocomplete name)
  $scope.smaPeriod = 2; // TODO : Someone please create UI hook for this natural number value
  $scope.dataAggergationPeriod = moment.duration(5, 'seconds')
  $scope.numTimeIntervals = 20*5
  $scope.GenerateReport = function()
  {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.reportData = response.data.reverse(); // data comes in as latest first which isn't normal convention so we reverse it.
        let sku = $scope.sku;
        let skuData = $scope.reportData.filter((record) => record.sku == sku)
        let time = $scope.reportData.filter((record) => record.sku == sku).map((record) => new Date(record.date) )

        let timeInterval = moment(dateTo).subtract(dateFrom)
        console.log((moment($scope.dateFrom).add(timeInterval*5).toDate()))
        let evenTimes =[];
        for(let i=0; i<$scope.numTimeIntervals; i++) {evenTimes.push( moment($scope.dateFrom).add(i*$scope.dataAggergationPeriod).toDate() )}
        console.log(evenTimes)
        //let aggTime = for() moment(dateFrom).add(i*$scope.dataAggergationPeriod) )
        let sales = skuData.filter((record) => record.sku == sku).map((record) => record.quantity )
        let salesValue = skuData.map((record) => Number(record.quantity)*Number(record.price))

        // Simple moving average
        let smaPeriod = Math.max($scope.smaPeriod,1)
        let sma = sales.map((data,i,arr) => arr.slice(i,i+smaPeriod).reduce((acc, data)=>acc+data)/smaPeriod )
        sma = Array(smaPeriod).fill(null).concat(sma)


        console.log("Making Report");
        let chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'time',
            xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
            columns: [
              ['time'].concat(time),
              ['sales'].concat(sales),
              ['sma'].concat(sma)
            ]
          },
          axis: {
              x: {
                  type: 'timeseries',
                  tick: {
                      format: '%Y-%m-%d %H:%M:%S',
                      rotate: 60
                  }

              }
          }
        })
      }
    )
  }


});
