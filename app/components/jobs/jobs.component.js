angular.module('jobs').component('jobs',
  {
      templateUrl: 'components/jobs/jobs.template.html',
      controller: ['$http', '$scope', '$timeout',
        function jobsController($http, $scope, $timeout) {
          $scope.running = {'1':{
            'id': '1',
            'status':'running',
            'description':'a test job',
            'name':'job1',
            'submitted_at':'07/02/2017 11:56'
          },'2':{
            'id': '2',
            'status':'running',
            'description':'a second test job',
            'name':'job2',
            'submitted_at':'07/02/2017 12.05'
          }
        };
        $scope.isCollapsed = true;

        }
      ]
  }
  );
