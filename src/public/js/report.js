'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {
  $scope.dateFrom = new Date(1970,1,1);
  $scope.dateTo = new Date();

  $scope.GenerateReport = function()
  {
    console.log("Making Report");
  }

});
