'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state, $firebase, $firebaseSimpleLogin, foodSvc) {

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

  var total = 0;
  var correct = 0;
  var wrong = 0;
  var results = [];

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
      var question = {
        foodName: data.foodName,
        category: data.category,
        name: getQuestion(data.category.toLowerCase(), data.foodName.toLowerCase()),
        image: getImagePath(data.barcode),
        answer: data.answer,
      };
      $scope.question = question;

      // results.push(question);
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
      var correctAnswer = $scope.question;
      correctAnswer.result = true;
      results.push(correctAnswer);
    } else {
      wrong++;
      var wrongAnswer = $scope.question;
      wrongAnswer.result = false;
      results.push(wrongAnswer);
    }
    console.log(total, correct, wrong);
    if (total < 10) {
      getNext();
    } else {
      console.log(results);
      resultRef.set(results);

      $state.go('tab.account');
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
  var i;
  var people = [];
  for (i = 1; i < 32; i++) { 
    people.push(i.toString())
  };
  $scope.array = people
});
