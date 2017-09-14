'use strict';
var app = angular.module("ReportApp", []);

app.controller("ReportCtrl", function ($scope, $http) {

  $scope.GenerateReport = function()
  {
    console.log("Making Report");
  }

});
