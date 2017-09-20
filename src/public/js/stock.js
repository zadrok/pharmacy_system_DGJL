'use strict';
var app = angular.module("StockApp", []);

app.controller("StockCtrl", function ($scope, $http) {
  $scope.currentStockItem = null;
  $scope.newStockItem = null;

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
    $http.post('/delete');

    $scope.SetCurrentStockItem(null);
  };

  $scope.Update = function(item)
  {
    console.log("Update " + item.name + ", Price: " + item.price + ", Quantity: " + item.quantity);
    $http.post('/update');

    $scope.SetCurrentStockItem(null);
  };

  $scope.Add = function()
  {
    console.log("Add new item " + $scope.newStockItem.name + ", Price: " + $scope.newStockItem.price + ", Quantity: " + $scope.newStockItem.quantity);
      $scope.temp = [ {name:'name', value:$scope.newStockItem.name},
                      {name:'price', value:$scope.newStockItem.price},
                      {name:'qty', value:$scope.newStockItem.quantity}];
    $http.post('/create',$scope.temp);

    $scope.newStockItem = null;
  };

  $scope.SetCurrentStockItem = function(item)
  {
    $scope.currentStockItem = item;
  };

});
