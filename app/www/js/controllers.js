'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicPopup) {
  $scope.swipeLeft = function () { 
    console.log('swiped left');
    // var alertPopup = 
    $ionicPopup.alert({
     title: 'Swiped left!',
     // template: 'It might taste good'
    });
  };
  $scope.swipeRight = function () {
    console.log('swiped right');

    $ionicPopup.alert({
      title: 'Swiped right!',
     // template: 'It might taste good'
    });
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
