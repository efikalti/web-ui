'use strict';

/**
 * Master Controller
 */

angular.module('webUI')
    .controller('MasterCtrl', ['$state', '$scope', '$cookieStore', '$location', 'appData', MasterCtrl]);

function MasterCtrl($state, $scope, $cookieStore, $location, appData) {
    /**
    * LDAP authentication
    */
    //$scope.auth = auth;

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.data = appData;

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

    $scope.changeView = function(view){
      $state.transitionTo(view);
    }

}
