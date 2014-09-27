'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, foodSvc) {

  $scope.activeSlide = 1;
  var baseImgPath = 'img/food_images/'

  var questions = {
    energy: 'Do <foodname> have lots of energy?',
    protein: 'Are <foodname> high in protein?',
    carbohydrate: 'Are <foodname> high in carbohydrate?',
    fat: 'Do <foodname> contain lots of fat?',
    calcium: 'Do <foodname> contain lots of calcium?'
  }

  var getQuestion = function(category, foodName){
    return questions[category].replace('<foodname>', foodName);
  }

  var getImagePath = function(barcode){
    return './' + baseImgPath + barcode + '.jpg';
  }

  foodSvc.getNext(function (data) {
    console.log('Get next object', data);
    $scope.question = {
      name: getQuestion(data.category.toLowerCase(), data.foodName.toLowerCase()),
      image: getImagePath(data.barcode),
      answer: true,
    };
  })

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
