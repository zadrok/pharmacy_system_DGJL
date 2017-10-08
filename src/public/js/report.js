'use strict';
var app = angular.module("ReportApp", []);
window['moment-range'].extendMoment(moment);

app.controller("ReportCtrl", function ($scope, $http) {
  $scope.dateFrom = moment('2017-10-06T10:25').toDate();//.subtract(1,'hours').toDate(); //yyyy,m,d
  $scope.dateTo = moment('2017-10-06T10:35').toDate();

  $scope.sku = 0; // (TODO : Someone please change this guy to be autocomplete name)
  //this looks at the past x values and takes the average as the prediction for the next.  Its more of an indicator than a predictor but still valuable
  $scope.smaPeriod = 2;

  $scope.dataAggergationUnit = 'weeks';
  $scope.numberOfAggregationUnit = 1;
  
  $scope.GenerateReport = function() {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.reportData = response.data.reverse(); // data comes in as latest first which isn't normal convention so we reverse it.
        let sku = $scope.sku;
        let skuData = $scope.reportData.filter((record) => record.sku == sku)
        let time = skuData.map((record) => new Date(record.date) )

        let timeRange = moment.range($scope.dateFrom, $scope.dateTo)
        let evenMoments = Array.from(timeRange.by($scope.dataAggergationUnit, {step:$scope.numberOfAggregationUnit , exclusive:true}))
        let evenIntervals = evenMoments.map((m,i)=> moment.range(m,evenMoments[i+1])) // There may be an out of range exception thrown here but js might suppress it
        let evenTimes = evenMoments.map((m)=>m.toDate())

        let sales = skuData.map((record) => record.quantity )
        let salesValue = skuData.map((record) => Number(record.quantity)*Number(record.price))

        // This is a really heavy function, there is probably a way better way to do it
        // should also definitely be async
        let aggregatedSales = evenIntervals.map((interval) => {
            let sum = sales.reduce((acc, s, i) => {
                if(interval.contains(moment(time[i]))){
                  return acc += s
                }
                return acc;
              }, 0)
            return sum
        }
      )

        // Simple moving average
        let smaPeriod = Math.max($scope.smaPeriod,1)
        let sma = aggregatedSales.map((data,i,arr) => arr.slice(i,i+smaPeriod).reduce((acc, data)=>acc+data)/smaPeriod )
        sma = Array(smaPeriod).fill(null).concat(sma)

        console.log("Making Report");
        let chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'time',
            xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
            columns: [
              ['time'].concat(evenTimes),
              ['sales'].concat(aggregatedSales),
              ['sma'].concat(sma)
            ]
          },
          axis: {
              x: {
                  type: 'timeseries',
                  tick: {
                    format: '%Y-%m-%d %H:%M:%S',
                    rotate: 90
                  }

              }
          }
        })
      }
    )
  }


});
