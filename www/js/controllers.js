'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $firebase, $firebaseSimpleLogin, $ionicSwipeCardDelegate, $rootScope, foodSvc) {

  /*
   * Firebase stuff
   */
  var ref = new Firebase('https://tinderforfood.firebaseio.com/');
  // create an AngularFire reference to the data
  var sync = $firebase(ref);
  $scope.data = sync.$asObject();
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, 'data');

  var resultRef = ref.child('results');

  var authClient = $firebaseSimpleLogin(ref);
  // log user in using the Facebook provider for Simple Login
  $scope.loginWithFacebook = function() {
      authClient.$login('facebook').then(function(user) {
      console.log('Logged in as: ' + user.uid);
    }, function(error) {
      console.error('Login failed: ' + error);
    });
  };
  // $scope.loginWithFacebook();
  console.log('logging in with facebook');

  /*
   * Keep track of score
   */
  var count = 0;
  var correct = 0;
  var wrong = 0;
  var results = [];
  var direction = {
    right: 0,
    left: 0,
    reset: function(){
      this.right = 0;
      this.left = 0;
    }
  };

  $scope.dragged = function($event){
    if ($event.gesture.direction === 'right'){
      direction.right++;
    } else if ($event.gesture.direction === 'left') {
      direction.left++;
    };
  }

  $scope.answer = function(idx){
    var answer = direction.right > direction.left;
    console.log('Question', idx, 'answer:', answer)
    direction.reset();
    count++;

    if ( answer === $scope.cards[idx].answer ) {
      correct++;
      var correctAnswer = $scope.cards[idx];
      correctAnswer.result = true;
      results.push(correctAnswer);
    } else {
      wrong++;
      var wrongAnswer = $scope.cards[idx];
      wrongAnswer.result = false;
      results.push(wrongAnswer);
    }
    console.log(idx, correct, wrong);
    if (idx === 0) {
      console.log(results);
      resultRef.set(results);

      $state.go('tab.account');
    }
    console.log(count, correct, wrong);
  };

  /*
   * Initiate cards
   */
  var getQuestion = function(category, foodName){
    var questions = {
      energy: 'Do <foodname> have lots of energy?',
      protein: 'Are <foodname> high in protein?',
      carbohydrate: 'Are <foodname> high in carbohydrates?',
      fat: 'Do <foodname> contain lots of fat?',
      calcium: 'Do <foodname> contain lots of calcium?'
    };

    return questions[category].replace('<foodname>', foodName);
  };

  var getImagePath = function(barcode){
    var baseImgPath = 'img/food_images/';
    return './' + baseImgPath + barcode + '.jpg';
  };

  $scope.cards = [];
  var getCards = function() {
    var cards = [];
    foodSvc.getNext(function(data) {
      for (var i = 0; i < data.length; i++){
        cards.push({
          foodName: data[i].foodName,
          category: data[i].category,
          name: getQuestion(data[i].category.toLowerCase(), data[i].foodName.toLowerCase()),
          image: getImagePath(data[i].barcode),
          answer: data[i].answer
        });
      }
      $scope.cards = cards;

      console.log('Cards: ', $scope.cards);
    });
  };

  if($scope.cards.length === 0) {
    getCards();
  }
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
  for (i = 1; i < 10; i++) {
    people.push(i.toString())
  };
  $scope.array = people
});
