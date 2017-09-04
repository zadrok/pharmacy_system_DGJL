var app = angular.module("myApp", []);

app.filter("offset", function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input?input.slice(start) : "";
  };
});

app.controller("paginationCtrl1", function ($scope, $http) {
  console.log("ctrl")
  $scope.stockPerPage = 5;
  $scope.currentPage = 0;
  $http.get('testStock.json')
  .then(
    function (response) {
      console.log(response)
      $scope.stock = response.data;
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


});
