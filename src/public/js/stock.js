'use strict';
var app = angular.module("StockApp", []);

app.controller("StockCtrl", function ($scope, $http) {
  $scope.currentStockItem = null;
  $http.post('/read')
  .then(
    function (response) {
      //console.log(response);
      $scope.stock = response.data;

    //console.log($scope.stock.length);
    },
    function (response) {
      // error handling routine
    }
  );

  $scope.Delete = function(item)
  {
    console.log("Delete " + item.name);
  };

  $scope.Update = function(item)
  {
    console.log("Update " + item.name);
  };

  $scope.Add = function()
  {
    console.log("Add new item");
  };

  $scope.SetCurrentStockItem = function(item)
  {
    $scope.currentStockItem = item;
  };

});
