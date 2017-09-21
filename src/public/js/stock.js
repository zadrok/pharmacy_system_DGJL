'use strict';
var app = angular.module("StockApp", []);

app.controller("StockCtrl", function ($scope, $http) {
  $scope.currentStockItem = null;
  $scope.newStockItem = null;

  $http.post('/read')
  .then(function (response) {$scope.stock = response.data;});

  $scope.Delete = function(item)
  {
    console.log("Delete " + item.sku);
    $scope.temp = JSON.stringify({ sku:item.sku});
    $http.post('/delete',$scope.temp)
    .then(function (response) {$scope.stock = response.data;});

    $scope.SetCurrentStockItem(null);
  };

  $scope.Update = function(item)
  {
    console.log("Update " + item.name + ", Price: " + item.price + ", Quantity: " + item.quantity);
    $scope.temp = JSON.stringify(item);
    $http.post('/update', $scope.temp)
    .then(function (response) {$scope.stock = response.data})
    $scope.SetCurrentStockItem(null);
  };

  $scope.Add = function()
  {
    console.log("Add new item " + $scope.newStockItem.name + ", Price: " + $scope.newStockItem.price + ", Quantity: " + $scope.newStockItem.quantity);
    $scope.temp = JSON.stringify(
      { name:$scope.newStockItem.name,
        price:$scope.newStockItem.price,
        quantity:$scope.newStockItem.quantity});
    $http.post('/create',$scope.temp)
    .then(function (response) {$scope.stock = response.data;});

    $scope.newStockItem = null;
  };

  $scope.SetCurrentStockItem = function(item)
  {
    $scope.currentStockItem = item;
  };
});
