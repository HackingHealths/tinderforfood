'use strict';

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, $state, $firebase, $firebaseSimpleLogin, $ionicSwipeCardDelegate, $timeout, foodSvc) {
  $rootScope.scrollable = true;
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
    }
  };

  var updateFirebase = function (resultsArray) {
    //Code to refresh database
    // resultRef.set({
    //   result: {
    //     Apples: {
    //       Sugars: {
    //         total: 0
    //       }
    //     }
    //   }
    // });
    // var obj = {};
    for (var i = 0; i < resultsArray.length; i ++) {
      var fruit = resultsArray[i].foodName;
      var category = resultsArray[i].category;
      var correct = resultsArray[i].result;
      resultRef.once('value', function (snapshot) {
        var oldCorrect;
        var oldWrong;
        var oldTotal;
        var newObj = {};
        newObj[fruit] = {};
        newObj[fruit][category] = {};

        if (!snapshot.val()[fruit] || !snapshot.val()[fruit][category]) {
          oldCorrect = 0;
          oldWrong = 0;
          oldTotal = 0;
        } else {
          oldCorrect = snapshot.val()[fruit][category].correct || 0;
          oldWrong = snapshot.val()[fruit][category].wrong || 0;
          oldTotal = snapshot.val()[fruit][category].total;
        }

        if (correct) {
          newObj[fruit][category].correct = oldCorrect + 1;
          newObj[fruit][category].wrong = oldWrong;
        } else {
          newObj[fruit][category].correct = oldCorrect;
          newObj[fruit][category].wrong = oldWrong + 1;
        }
        newObj[fruit][category].total = oldTotal + 1;
        var newRef = new Firebase('https://tinderforfood.firebaseio.com/results/' + fruit + '/' + category);
        newRef.update(newObj[fruit][category]);

      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      });
    }
  };

  $scope.answer = function(idx){
    var answer = direction.right > direction.left;
    // console.log('Question', idx, 'answer:', answer)
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
    if (idx === 0) {
      // formFireBaseObj(results);
      // resultRef.set(results);
      updateFirebase(results);
      foodSvc.saveResult(results, function () {
        $state.go('tab.account');
      });
    }
    // console.log('SCORE', count, ':', correct, 'correct', wrong, 'wrong');
  };

  /*
   * Initiate cards
   */
  var getLoadingFact = function(initial){
    var facts = [
      "In the U.S., the apples sold at stores can be up to a year old.",
      "A strawberry isn't an actual berry, but a banana is.",
      "Grapes explode when you put them in the microwave.",
      "Apples, peaches and raspberries are all members of the rose family.",
      "Oranges are not even in the top ten list of common foods when it comes to vitamin C levels.",
      "The World's Most Popular Fruit is the tomato.",
      "Coffee beans aren't beans. They are fruit pits.",
      "Bananas are slightly radioactive.",
      "Drinking grapefruit while taking medication can cause instant overdose and death.",
      "Square Watermelons are grown by japanese farmers for easier stack and store.",
      "Cucumbers are fruits.",
      "The color Orange is named after the Orange fruit, but before that, it was called geoluread (yellow-red).",
      "The Coco de Mer palm tree has the earth's largest fruit, weighing 42 kg (92 lb), and seeds weighing 17 kg (37 lb).",
      "There is a tree called Fruit Salad Tree that sprouts 3 to 7 different fruits in the same tree.",
      "Vegetables and fruits don't die the moment they are harvested.",
      "Tomatoes have more genes than humans."
    ];

    var i = Math.floor(Math.random() * facts.length);

    $timeout(getLoadingFact, 4000);

    if(initial){
      $scope.viewLoadingHeader = "Get Ready..."
      $scope.viewLoadingFact = "We'll ask questions. Swipe left for no, swipe right for yes"
    } else {
      $scope.viewLoadingHeader = "Fun Fact"
      $scope.viewLoadingFact = facts[i];
    }
  }

  var getQuestion = function(category, foodName){
    var questions = {
      energy0: 'Are <foodname> high in energy?',
      energy1: 'Are <foodname> low in energy?',
      protein0: 'Are <foodname> high in protein?',
      protein1: 'Are <foodname> low in protein?',
      carbohydrate0: 'Are <foodname> high in carbohydrates?',
      carbohydrate1: 'Are <foodname> low in carbohydrates?',
      fat0: 'Are <foodname> high in fat?',
      fat1: 'Are <foodname> low in fat?',
      calcium0: 'Are <foodname> high in calcium?',
      calcium1: 'Are <foodname> low in calcium?'
    };

    return questions[category].replace('<foodname>', foodName);
  };

  var getImagePath = function(barcode){
    var baseImgPath = 'http://tinderforfood.s3.amazonaws.com/food_images/';
    return baseImgPath + barcode + '.jpg';
  };

  var loaded = 0;
  $scope.viewReady = false;
  $scope.viewTitle = "Gin Hong 健康"
  getLoadingFact(true);
  $scope.imageLoaded = function(){
    loaded++;
    if (loaded === 10){
      $scope.viewReady = true;
      $scope.viewTitle = "Swipe Left For No, Swipe Right For Yes";
    }
  }

  $scope.cards = [];
  var getCards = function() {
    var cards = [];
    foodSvc.getNext(function(data) {
      for (var i = 0; i < data.length; i++){
        // semi-randomly parse through different paraphrase of questions
        var type = i % 2;

        // correspond the answer to the question
        var answer;
        if (type == 0){
          answer = data[i].answer
        }
        else{
          answer = !data[i].answer
        }

        cards.push({
          foodName: data[i].foodName,
          category: data[i].category,
          name: getQuestion(data[i].category.toLowerCase()+String(type), data[i].foodName.toLowerCase()),
          image: getImagePath(data[i].barcode),
          answer: answer
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

.controller('AccountCtrl', function($rootScope, $scope, $firebase, $state, foodSvc) {
  $rootScope.scrollable = false;
  
  var rootRef = new Firebase('https://tinderforfood.firebaseio.com/');
  var sync = $firebase(rootRef);
  $scope.data = sync.$asObject();
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, 'data');

  var resultRef = rootRef.child('results');

  foodSvc.getResult(function (results) {
    // if (!results) {
    //   $state.go('tab.home');
    // }
    //result of the 10 questions that user just answered
    var userResults = results;

    resultRef.once('value', function (snapshot) {
      var otherResults = snapshot.val();
      //result of all users history
      for (var i = 0; i < userResults.length; i ++) {
        var fruit = userResults[i].foodName;
        var category = userResults[i].category;
        var percentageRight = otherResults[fruit][category].correct / otherResults[fruit][category].total;
        percentageRight = Math.round(percentageRight*100)
        // console.log(category);
        // var result = userResults[i].result;
        // console.log(result);
        userResults[i].percentageRight = percentageRight;
        // $scope.results[i] = {
        //   fruit: fruit,
        //   category: category,
        //   result: result
        // }
      }
    });
    $scope.results = userResults;
    console.log($scope.results);
  });


  var i;
  var peopleRight = [];
  var peopleWrong = [];
  for (i = 1; i < 10; i++) {
    var j = Math.round(Math.random()*31);
    peopleRight.push(j.toString()); 
    var k = Math.round(Math.random()*31);
    peopleWrong.push(k.toString());
  };
  $scope.peopleRight = peopleRight;
  $scope.peopleWrong = peopleWrong;
});
