'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {
  $scope.dateFrom = new Date(1970,1,1);
  $scope.dateTo = new Date();

  $scope.GenerateReport = function()
  {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales-for-report', $scope.requestBody)
    .then(
      function (response) {
        $scope.reportData = response.data;
        // reportData should contain a property that replaces x and data1 below
        console.log("Making Report");
        c3.generate({
          bindto: '#chart',
          data: {
            x: 'x',
            columns: [
              ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
            ]
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                  format: '%Y-%m-%d'
              }
            }
          }
        })
      }
    )
  }


});
