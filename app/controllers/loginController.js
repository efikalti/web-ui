'use strict';

angular.module('webUI')
    .controller('loginController', ['$scope', '$http', '$state', 'appData', function($scope, $http, $state, appData) {
      $scope.login = function(user) {
        if (typeof user == "undefined")
        {
            $('.log-status').addClass('wrong-entry');
            $('#invalid').fadeIn(500);
            setTimeout( "$('#invalid').fadeOut(1500);",3000 );
            return;
        }
        else if (typeof user.username == "undefined") {
            $('#username-form').addClass('wrong-entry');
            $('#invalid').fadeIn(500);
            setTimeout( "$('#invalid').fadeOut(1500);",3000 );
            return;
        }
        else if (typeof user.password == "undefined") {
            $('#password-form').addClass('wrong-entry');
            $('#invalid').fadeIn(500);
            setTimeout( "$('#invalid').fadeOut(1500);",3000 );
            return;
        }
        // Username and password provided, call to backend to authenticate
        $http({
          method: 'POST',
          url: 'http://localhost:8001/api/auth',
          data: { username: user.username, password: user.password }
        }).then(function successCallback(response) {
            appData.logIn(response.data.user)
            console.log(response);
            $state.transitionTo('home');
          }, function errorCallback(response) {
            console.log(response);
            if ( response.status == 401 ){
              $('#username-form').addClass('wrong-entry');
              $('#password-form').addClass('wrong-entry');
              $('#invalid').fadeIn(500);
              setTimeout( "$('#invalid').fadeOut(1500);",3000 );
            }
            else {
                $('#server').fadeIn(500);
                setTimeout( "$('#server').fadeOut(1500);",3000 );
            }
          });
      };

      $('.form-control').keypress(function(){
          $('.log-status').removeClass('wrong-entry');
      });

    }]);
