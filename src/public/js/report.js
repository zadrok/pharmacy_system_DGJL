'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {
  $scope.dateFrom = new Date();
  $scope.dateTo = new Date();

  $scope.GenerateReport = function()
  {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.reportData = response.data;
        let sku = 2; // Need an input field for this guy like in sales page
        let skuData = $scope.reportData.filter((record) => record.sku == sku)
        let time = $scope.reportData.map((record) => new Date(record.date) )
        let sales = skuData.map((record) => record.quantity )
        let salesValue = skuData.map((record) => Number(record.quantity)*Number(record.price) )
        // reportData should contain a property that replaces x and data1 below
        console.log("Making Report");
        let chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'time',
            xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
            columns: [
              ['time'].concat(time),
              ['sales'].concat(sales),
              ['salesValue'].concat(salesValue)
            ]
          },
          axis: {
              x: {
                  type: 'timeseries',
                  tick: {
                      format: '%Y-%m-%d %H:%M:%S',
                  }
              }
          }
        })
      }
    )
  }


});
