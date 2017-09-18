'use strict';
var app = angular.module("SaleApp", []);

app.controller("SaleCtrl", function ($scope, $http) {
  $scope.newSalesItem = {"name":"", "price":"", "quantity":""};
  $scope.cart = [];

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

  $scope.Add = function()
  {
    $scope.newSalesItem.price = "";
    var found = false;
    for (var i = 0; i < $scope.stock.length; i++)
    {
      if ($scope.stock[i].name == $scope.newSalesItem.name )
      {
        $scope.newSalesItem.price = $scope.stock[i].price;
        found = true;
      }
    }

    if (found)
    {
      $scope.cart.push({"name":$scope.newSalesItem.name, "price":$scope.newSalesItem.price, "quantity":$scope.newSalesItem.quantity});
      $scope.newSalesItem = {"name":"", "price":"", "quantity":""};
    }
    else
    {
      alert("Coudn't find item: " + $scope.newSalesItem.name);
    }
  };

  $scope.GetTotal = function()
  {
    var total = 0;
    for (var i = 0; i < $scope.cart.length; i++)
    {
      total += ($scope.cart[i].price * $scope.cart[i].quantity);
    }

    return total;
  };

  $scope.Submit = function()
  {
    if ($scope.cart.length)
    {
      console.log("Submit cart!");
      console.log($scope.cart);

      $scope.cart = [];
    }
  };

});



app.controller('MainCtrl', function() {
  var that = this;
  that.breakfast = null;

  that.autoCompleteOptions = {
    minimumChars: 0,
    activateOnFocus: true,
    data: function (term) {
      term = term.toUpperCase();
      return _.filter(BREAKFAST, function (value) {
        return value.startsWith(term);
      });
    }
  }
});
