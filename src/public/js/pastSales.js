'use strict';
var app = angular.module("PastSalesApp", []);

app.controller("PastSalesCtrl", function ($scope, $http) {
  $scope.currentSalesItem = {"id":"", "amount":""};

  $http.post('/read')
  .then(
    function (response) {
      //console.log(response);
      $scope.sales = response.data;

    //console.log($scope.stock.length);
    },
    function (response) {
      // error handling routine
    }
  );

  $scope.Delete = function(item)
  {
    console.log("Deleting " + item.id);
    $scope.SetCurrentSalesTarget(null);
  }

  $scope.SetCurrentSalesTarget = function(item)
  {
    $scope.currentSalesItem = n;
  }

});
