'use strict';
var app = angular.module("PastSalesApp", []);

app.controller("PastSalesCtrl", function ($scope, $http) {
  $scope.currentSalesItem = {id:"", date:"", totalAmount:""};
  $scope.dateFrom = new Date(1970,1,1);
  $scope.dateTo = new Date();


  $scope.Read = function(){
    $scope.requestBody = JSON.stringify({dateFrom:$scope.dateFrom.toJSON(), dateTo:$scope.dateTo.toJSON()});
    $http.post('/read-sales', $scope.requestBody)
    .then(
      function (response) {
        $scope.sales = response.data;
      }
    )
  }

  $scope.Update = function(item)
  {
    console.log("Updating " + item.id);
    $scope.SetCurrentSalesTarget(null);
  }

  $scope.Delete = function(item)
  {
    console.log("Deleting " + item.id);
    $scope.SetCurrentSalesTarget(null);
  }

  $scope.SetCurrentSalesTarget = function(item)
  {
    $scope.currentSalesItem = n;
  }

  $scope.Read();
});
