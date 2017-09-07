'use strict';
var app = angular.module("CreateUpdateApp", []);

app.controller("CreateUpdateCtrl",['$scope', function($scope) {
  $scope.good = false;
}]);

app.directive('ngContainSpecial', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, mCtrl) {
			function myValidation(value) {
        var index;
        var a = ["$", "%", "^", "&", "*"];
        for (index = 0; index < a.length; ++index) {
          if (value.indexOf(a[index]) < 0) {
  					mCtrl.$setValidity('containSpecial', false);
  				} else {
  					mCtrl.$setValidity('containSpecial', true);
  				}
        }
				return value;
			}
			mCtrl.$parsers.push(myValidation);
		}
	};
});
