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
            login: false,
        },
        SaveState: function () {
            sessionStorage.appData = angular.toJson(service.model);
        },

        RestoreState: function () {
            service.model = angular.fromJson(sessionStorage.appData);
        },

        toggle: function () {
            service.model.toggle = !service.model.toggle;
        },

        isLoggedIn: function() {
          return service.model.login;
        },

        logIn: function(user) {
          service.model.user = user;
          service.model.login = true;
          return;
        }
    }

    $rootScope.$on("savestate", service.SaveState);
    $rootScope.$on("restorestate", service.RestoreState);

    return service;
}]);

app.run(['$rootScope', '$state', 'appData', function ($rootScope, $state, appData) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!appData.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $state.transitionTo('login');
        }
        else {
            console.log('ALLOW');
        }
    });
}]);
