var app = angular.module("AllStockApp", []);

app.controller("AllStockCtrl", function ($scope, $http) {
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
