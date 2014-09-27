'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicPopup, foodSvc) {

  $scope.activeSlide = 1;

  $scope.question = {
    name: "Does this food have lots of protein?",
    image: "http://world.openfoodfacts.org/images/products/848/001/716/1833/front.5.200.jpg",
    answer: true,
  };

  $scope.answer = function(index){
    if (index === 1) {
      $scope.result = 'question-bg-blank';
    } else {
      console.log('Selected answer:', index === 2);
      $scope.result = index === 2 ? 'question-bg-correct' : 'question-bg-wrong';
      console.log($scope.result);
    }
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
