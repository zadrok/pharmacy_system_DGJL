'use strict';
var app = angular.module("TransactionsApp", []);

app.controller("TransactionsCtrl", function ($scope, $http) {
  $scope.currentTransactionsItem = {id:"", date:"1T3.4", totalAmount:""};
  $scope.dateFrom = new Date(1970,1,1);
  $scope.dateTo = new Date();
  $scope.transactionType = "BOTH"; //TODO : use this

  $scope.Read = function()
  {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.sales = response.data;
      }
    )
  };

  $scope.TypeSelect = function(type)
  {
    $scope.transactionType = type;
  };

  $scope.Refund = function(item)
  {
    console.log("Refunding " + item.id);

    //$scope.temp = JSON.stringify({ sku:item.sku });
    //$http.post('/delete-sales',$scope.temp)
    //.then(function (response) {$scope.sales = response.data;});

    //$scope.SetCurrentTransactionsTarget(null);
  };

  $scope.FormatDate = function(item)
  {
    var a = item.split("T");
    var b = a[1].split(".");
    return "" + a[0] + " " + b[0];
  };

  $scope.SetCurrentTransactionsTarget = function(item)
  {
    $scope.currentTransactionsItem = item;
  };

  $scope.Read();
});
