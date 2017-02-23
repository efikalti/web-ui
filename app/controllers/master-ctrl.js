/**
 * Master Controller
 */

angular.module('webUI')
    .controller('MasterCtrl', ['$state', '$scope', '$cookieStore', '$location', MasterCtrl]);

function MasterCtrl($state, $scope, $cookieStore, $location) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

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
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
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

}
