// Define the `webUI` module
var app = angular.module('webUI', [
    'ngAnimate',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'jobs'
]);

app.controller('uiController', function($scope) {

    $scope.message = 'test';

});
