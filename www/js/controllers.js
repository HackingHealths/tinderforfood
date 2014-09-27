'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicPopup, foodSvc) {

  $scope.foodArray = [];

  foodSvc.start(function (data) {
    $scope.foodArray = data;
  });
  $scope.answerQuestion = function (direction) {
    foodSvc.getNext(function (data) {
      // console.log(data);
    });
    if (direction === 'left') {
      // console.log('swiped left');
      $ionicPopup.alert({
        title: 'Swiped left!',
      });
    } else if (direction === 'right') {
      // console.log('swiped right');
      $ionicPopup.alert({
        title: 'Swiped right!',
       // template: 'It might taste good'
      });
    }
    
    $scope.foodArray.pop();
    // console.log($scope.foodArray);
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
