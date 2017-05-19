'use strict';

angular.module('webUI')
    .controller('jobsController', ['$scope', '$http', '$state', 'Upload', function($scope, $http, $state, Upload) {
        // TEST DATA TO BE REMOVED
        $scope.running = {
            '1': {
                'id': '1',
                'status': 'running',
                'description': 'a test job',
                'name': 'job1',
                'submitted_at': '07/02/2017 11:56'
            },
            '2': {
                'id': '2',
                'status': 'running',
                'description': 'a second test job',
                'name': 'job2',
                'submitted_at': '07/02/2017 12.04'
            }
        };

        $scope.stopped = {
          '3': {
              'id': '3',
              'status': 'stopped',
              'description': 'a third test job',
              'name': 'third-job',
              'submitted_at': '13/02/2017 13.05'
          }
        };

        $scope.finished = {
          '4': {
              'id': '4',
              'status': 'finished',
              'description': 'a fourth test job',
              'name': '4 job',
              'submitted_at': '13/02/2017 13.23'
          }
        };

        $scope.filtersShow = true;
        $scope.filters = {
          stopped : true,
          running : true,
          finished : true,
        };

        if (typeof $state.current.data !== 'undefined'){
          $scope.locationName = $state.current.data.locationName;
        }

        $scope.exec_file = null;
        $scope.input_files = [];


        // upload later on form submit or something similar
        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        $scope.upload = function(file) {
            Upload.upload({
                url: 'upload/url',
                data: {
                    file: file,
                    'username': $scope.username
                }
            }).then(function(resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        // For input files:
        $scope.uploadFiles = function(files) {
            if (files && files.length) {

              files.forEach(function(file) {
                  console.log(file);
                  $scope.input_files.push(file);
              });
                //$scope.submit.exec_file = files[0];
                //console.log($scope.submit.exec_file);
                // or send them all together for HTML5 browsers:
                //Upload.upload({..., data: {file: files}, ...})...;
            }
        }

        //For executable file
        $scope.uploadFile = function(file) {
            if (file) {
                if (file.length) {
                    $scope.exec_file = file[0];
                } else {
                    $scope.exec_file = file;
                }
            }
        }

        // Delete executable file
        $scope.deleteExecFile = function() {
          $scope.exec_file = null;
        }

        // Delete input file
        $scope.deleteFile = function(file) {
          $scope.input_files.splice($.inArray(file, $scope.input_files), 1);
        }

        // Delete all input file
        $scope.deleteAll = function() {
          $scope.input_files = [];
        }

        $scope.toggleFilters = function() {
          $scope.filtersShow = !$scope.filtersShow;
        }

    }]);
