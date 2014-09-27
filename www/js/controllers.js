'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, foodSvc) {
  var total = 0;
  var correct = 0;
  var wrong = 0;

  $scope.activeSlide = 1;
  var baseImgPath = 'img/food_images/';

  var questions = {
    energy: 'Do <foodname> have lots of energy?',
    protein: 'Are <foodname> high in protein?',
    carbohydrate: 'Are <foodname> high in carbohydrate?',
    fat: 'Do <foodname> contain lots of fat?',
    calcium: 'Do <foodname> contain lots of calcium?'
  };

  var getQuestion = function(category, foodName){
    return questions[category].replace('<foodname>', foodName);
  };

  var getImagePath = function(barcode){
    return './' + baseImgPath + barcode + '.jpg';
  };

  var getNext = function () {
    foodSvc.getNext(function (data) {
      $scope.question = {
        name: getQuestion(data.category.toLowerCase(), data.foodName.toLowerCase()),
        image: getImagePath(data.barcode),
        answer: data.answer,
      };
      console.log(data.answer);
    });
  };

  getNext();

  $scope.answer = function(index){
    if (index === '1') {
      $scope.result = $scope.question.answer ? 'question-bg-wrong' : 'question-bg-correct';
    } else {
      $scope.result = $scope.question.answer ? 'question-bg-correct' : 'question-bg-wrong';
    }

    total++;
    if ( $scope.result === 'question-bg-correct' ) {
      correct++;
    } else {
      wrong++;  
    }
    console.log(total, correct, wrong);
    getNext();
    
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  var i;
  var people = [];
  for (i = 1; i < 32; i++) { 
    people.push(i.toString())
  };
  $scope.array = people
});
