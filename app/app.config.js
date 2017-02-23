'use strict';

angular.module('webUI').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: 'templates/jobs/view-jobs.html',
                controller:'jobsController'
            })
            .state('submit', {
                url: '/submit',
                templateUrl: 'templates/jobs/submit-job.html',
                controller:'jobsController'
            });
    }
]);
