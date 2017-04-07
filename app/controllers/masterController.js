'use strict';

/**
 * Master Controller
 */

angular.module('webUI')
    .controller('masterController', ['$state', '$scope', '$cookieStore', '$location', '$rootScope', 'appData', masterController]);

function masterController($state, $scope, $cookieStore, $location, $rootScope, appData) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.data = appData;
    $scope.user = $cookieStore.get('user');

    if (typeof $state.current.data !== 'undefined'){
      $scope.locationName = $state.current.data.locationName;
    }

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        appData.toggle();
    };

    window.onresize = function() {
      $scope.$apply();
    };

    $scope.toggleMenu = function($id) {
      var item = $("#" + $id);
      item.slideToggle();
     };

    $scope.changeView = function(view){
      $state.transitionTo(view);
    }

    $scope.logout = function(){
      $cookieStore.remove('user');
      $state.transitionTo('login');
    }

}
