// Define the `webUI` module
var app = angular.module('webUI', [
  'ngAnimate',
  'ngTouch',
  'ui.router',
  'ui.bootstrap',
  'ngCookies',
  'ngFileUpload',
]);

app.factory('appData', ['$rootScope', '$cookieStore', function($rootScope, $cookieStore) {

  var service = {

    model: {
      toggle: true,
    },
    SaveState: function() {
      sessionStorage.appData = angular.toJson(service.model);
    },

    RestoreState: function() {
      service.model = angular.fromJson(sessionStorage.appData);
    },

    toggle: function() {
      service.model.toggle = !service.model.toggle;
    },

    logIn: function(user) {
      var today = new Date();
      var expiresValue = new Date(today);
      expiresValue.setSeconds(today.getSeconds() + 3600);
      $cookieStore.put('user', user, {
        'expires': expiresValue
      })
      return;
    }
  }

  $rootScope.$on("savestate", service.SaveState);
  $rootScope.$on("restorestate", service.RestoreState);

  return service;
}]);

app.run(['$rootScope', '$state', '$cookieStore', 'appData', function($rootScope, $state, $cookieStore, appData) {
  $rootScope.$on('$locationChangeStart', function(event, to) {
    if (typeof $cookieStore.get('user') === 'undefined') {
      event.preventDefault();
      $state.transitionTo('login');
    } else if (to.includes("login")) {
      $state.transitionTo('home');
    }
  });
}]);
