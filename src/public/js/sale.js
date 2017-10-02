'use strict';
var app = angular.module("SaleApp", []);

app.controller("SaleCtrl", function ($scope, $http) {
  $scope.newSalesItem = {sku:"",name:"", price:"", quantity:""};
  $scope.cart = [];
  $scope.cartInOut = false;
  $scope.transactionType = "SALE";

  $http.post('/read-skus')
  .then(function (response) {
      $scope.stock = response.data;
    }
  );

  $scope.Add = function()
  {
    $scope.newSalesItem.price = "";
    var found = false;
    var enoughStock = false;
    for (var i = 0; i < $scope.stock.length; i++)
    {
      if ($scope.stock[i].name == $scope.newSalesItem.name)
      {
        $scope.newSalesItem.price = $scope.stock[i].price;
        $scope.newSalesItem.sku = $scope.stock[i].sku;
        found = true;
      }
      if ($scope.newSalesItem.quantity > 0 && $scope.newSalesItem.quantity < $scope.stock[i].quantity){
        enoughStock = true;
      }
    }
    //more validation later
    if (!found) return alert("Coudn't find item: " + $scope.newSalesItem.name)
    if (!enoughStock) return alert("Not enough stock of: " + $scope.newSalesItem.name)
    if (found && enoughStock)
    {
      $scope.cart.push({
        "sku":Number($scope.newSalesItem.sku),
        "name":$scope.newSalesItem.name,
        "price":Number($scope.newSalesItem.price),
        "quantity":Number($scope.newSalesItem.quantity)
      });
      $scope.newSalesItem = {sku:"", name:"", price:"", quantity:""};
    }
  }

  $scope.GetTotal = function()
  {
    var total = 0;
    for (var i = 0; i < $scope.cart.length; i++)
    {
      total += ($scope.cart[i].price * $scope.cart[i].quantity);
    }

    return total;
  };

  $scope.RemoveFromCart = function(item)
  {
    for (var i = 0; i < $scope.cart.length; i++)
    {
      if (item.name == $scope.cart[i].name)
      {
        $scope.cart.splice(i,1);
      }
    }
  };

  $scope.TypeSelect = function(type)
  {
    $scope.transactionType = type;
  };

  $scope.Submit = function()
  {
    if ($scope.cart.length)
    {
      console.log("Submit cart!");
      console.log($scope.cart);
      $scope.temp = JSON.stringify({date:new Date().toJSON(), cart:$scope.cart});
      $http.post('/create-sale', $scope.temp)
      .then(function (response) {
          $scope.stock = response.data;
        }
      );
      $scope.cart = [];
    }
  };

});
