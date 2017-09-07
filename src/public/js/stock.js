var app = angular.module("StockApp", []);

app.controller("StockCtrl", function ($scope, $http) {
  $http.get('/js/testStock.json')
  .then(
    function (response) {
      console.log(response);
      $scope.stock = response.data;
    },
    function (response) {
      // error handling routine
    }
  );

});
