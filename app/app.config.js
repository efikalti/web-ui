'use strict';

angular.module('webUI')
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/dashboard.html',
                controller: 'masterController',
                data: {
                  locationName: 'Dashboard'
                }
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: 'templates/jobs/view-jobs.html',
                controller:'jobsController',
                data: {
                  locationName: 'Jobs'
                }
            })
            .state('submit', {
                url: '/submit',
                templateUrl: 'templates/jobs/submit-job.html',
                controller:'jobsController',
                data: {
                  locationName: 'Jobs!'
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller:'loginController'
            });
    }
]);
