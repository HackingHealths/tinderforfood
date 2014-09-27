'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, foodSvc) {

  $scope.activeSlide = 1;
  var baseImgPath = 'img/food_images/'

  var questions = {
    energy: 'Do <foodname> have lots of energy?'
    protein: 'Are <foodname> high in protein?'
    fibre: 'Are <foodname> high in fibre?'
    sugar: 'Do <foodname> contain lots of sugar?'
    calcium: 'Does <foodname> contain lots of calcium?'
  }

  var getQuestion = function(category, foodname){
    return questions[category].replace('<foodname>', foodname);
  }

  var getImagePath = function(barcode){
    return baseImgPath + barcode;
  }

  $scope.question = {
    name: getQuestion(),
    image: getImagePath(),
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
