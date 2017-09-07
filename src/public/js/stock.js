'use strict';
var app = angular.module("StockApp", []);

app.controller("StockCtrl", function ($scope, $http) {
  $http.get('/js/testStock.json')
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

  $scope.Delete = function(itemCode)
  {
    console.log("Delete " + itemCode);
  };

  $scope.Update = function(itemCode)
  {
    console.log("Update " + itemCode);
  };

});
