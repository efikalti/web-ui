// Define the `webUI` module
var app = angular.module('webUI', [
    'ngAnimate',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ngCookies',
    'ngFileUpload',
]);

app.factory('appData', ['$rootScope', function ($rootScope) {

    var service = {

        model: {
            toggle: true,
        },
        SaveState: function () {
            sessionStorage.appData = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.appData);
        },

        toggle: function () {
            service.model.toggle = !service.model.toggle;
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);
