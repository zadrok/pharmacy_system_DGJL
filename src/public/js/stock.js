'use strict';
var app = angular.module("StockApp", []);

app.filter("offset", function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

app.controller("StockCtrl", function ($scope, $http) {
  $scope.stockPerPage = 5;
  $scope.currentPage = 0;
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

  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start = $scope.currentPage;
    if (start > $scope.pageCount() - rangeSize)
    {
      start = $scope.pageCount() - rangeSize + 1;
    }

    for (var i = start; i < start + rangeSize; i++)
    {
      ret.push(i);
    }

    return ret;
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 0)
    {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount())
    {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.stock.length / $scope.stockPerPage) - 1;
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
  };

  $scope.Delete = function(itemCode)
  {
    console.log("Delete " + itemCode);
  };

  $scope.Update = function(itemCode)
  {
    console.log("Update " + itemCode);
  };

});
