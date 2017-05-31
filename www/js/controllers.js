angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $location,$state) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var password = $scope.loginData.password;
    var username = $scope.loginData.username;

    $http({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'http://42.159.118.142:8080/test_drive/api/authentication/login?username='+username+'&password='+password

    }).then(function successCallback(response) {
        $state.go('app.playlists');
    }, function errorCallback(response) {
      document.write(response);
    });

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($http,$scope,$state) {

    $scope.$on('$ionicView.enter', loadData);

    function loadData () {
        $http({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          url: "http://42.159.118.142:8080/test_drive/api/records"
        }).then(function successCallback(response) {
          $scope.response = response.data;


        }, function errorCallback(response) {
          document.write(response);
        });
    }



      $scope.showIdInfo = function (id) {
          $state.go("app.idInfo");
      }

})

.controller('createCtrl', function($state, $scope, $http) {
    $scope.create = {
        agreement: true,
        date: Date.now(),
        type: 'type'
    };

    $scope.done = function (){
        var req = {
          method: 'POST',
          url: 'http://42.159.118.142:8080/test_drive/api/records',
          headers: {
          'Content-Type': 'application/json'
        },
          data: $scope.create
        }

       $http(req).then(function(response){
           $state.go('app.playlists');
       }, function(response){
           document.write(response)
        });
    };

})
.controller("agreement", function ($state, $scope) {
  $http({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    url: "http://42.159.118.142:8080/test_drive/api/agreements"
}).then(function successCallback(response) {

    $scope.response = JSON.parse(reponse);
    var agreement = document.getElementById("agreement");
    agreement.innerHTML = "" + $scope.response;
  }, function errorCallback(response) {
    document.write(response);
  });

})
.controller("idInfo", function ($state, $scope, $http) {
    $scope.create = {
        agreement: true,
        date: Date.now(),
        type: 'type'
    };



    $scope.changeDone = function (){
        var req = {
          method: 'POST',
          url: 'http://42.159.118.142:8080/test_drive/api/records',
          headers: {
          'Content-Type': 'application/json'
        },
          data: $scope.create
        }

       $http(req).then(function successCallback(response){
            $state.go('app.playlists');
        }, function errorCallback(response){
            document.write(response)
        });
    }

});
