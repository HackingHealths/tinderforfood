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
    carbohydrate: 'Are <foodname> high in carbohydrates?',
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

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope) {
  $rootScope.correct = 0;
  $rootScope.wrong = 0;
  // var cardTypes = [
  //   { title: 'Swipe down to clear the card', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
  //   { title: 'Where is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic.png' },
  //   { title: 'What kind of grass is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic2.png' },
  //   { title: 'What beach is this?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic3.png' },
  //   { title: 'What kind of clouds are these?', image: 'http://ionicframework.com.s3.amazonaws.com/demos/ionic-contrib-swipecards/pic4.png' }
  // ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();


  };

  $scope.cardDestroyed = function(index) {
    if (this.swipeCard.positive === true) {
      $scope.$root.accepted++;
    } else {
      $scope.$root.rejected++;
    }
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate, $rootScope, $ionicGesture) {

  var doDragStart= function(e) {
    var width = this.el.offsetWidth;
    var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
    var distance = Math.abs(point - e.gesture.touches[0].pageY);// - window.innerWidth/2);

    this.touchDistance = distance * 10;


    console.log('Touch distance', this.touchDistance);//this.touchDistance, width);
  }

  $scope.accept = function () {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    $rootScope.accepted++;
    card.swipe(true);
  }
  $scope.reject = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    $rootScope.rejected++;
    card.swipe();
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
