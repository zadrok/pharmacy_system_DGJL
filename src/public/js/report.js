'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {

  $http.post('/read')
  .then(
    function (response) {
      //console.log(response);
      $scope.orders = response.data;

    //console.log($scope.stock.length);
    },
    function (response) {
      // error handling routine
    }
  );

});
