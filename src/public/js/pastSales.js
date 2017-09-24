'use strict';
var app = angular.module("PastSalesApp", []);

app.controller("PastSalesCtrl", function ($scope, $http) {
  $scope.currentSalesItem = {id:"", date:"", totalAmount:""};
  $scope.dateFrom = new Date(1970,1,1);
  $scope.dateTo = new Date();


  $scope.Read = function()
  {
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.sales = response.data;
      }
    )
  }

  $scope.Delete = function(item)
  {
    console.log("Deleting " + item.id);
    
    //$scope.temp = JSON.stringify({ sku:item.sku });
    //$http.post('/delete-sales',$scope.temp)
    //.then(function (response) {$scope.sales = response.data;});

    $scope.SetCurrentSalesTarget(null);
  }

  $scope.FormatDate = function(item)
  {
    var a = item.split("T");
    var b = a[1].split(".");
    return "" + a[0] + " " + b[0];
  }

  $scope.SetCurrentSalesTarget = function(item)
  {
    $scope.currentSalesItem = item;
  }

  $scope.Read();
});
