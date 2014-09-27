'use strict';

angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.factory('foodSvc', function($http) {
  // Might use a resource here that returns a JSON array

  var foodStorage = [];
  var question = [];
  var barcodes = ['01618419', '0161841', '01618419', '0161841', '01618419'];
  var currentIdx = 0;

  var compare = function (foodOne, foodTwo, category) {
    var answer = foodOne[category] > foodTwo[category] ? foodOne : foodTwo;
    return answer;
  };
 
  var createSet = function (foodOne, foodTwo, category) {
    var answer = foodOne[category] > foodTwo[category] ? foodOne : foodTwo;

    // var answer = compare(foodOne, foodTwo, )
    return {
      foodOne: foodOne,
      foodTwo: foodTwo,
      question: '',
      image: '',
      answer: answer
    };
  };

  return {
    start: function(cb) {
      console.log(foodData);
      
      for (var i = 0; i < barcodes.length; i++) {
        var barcode = barcodes[i];
        $http.get('http://world.openfoodfacts.org/api/v0/products/' + barcode)
        .success(function (data) {
          foodStorage.push(data);
          if (foodStorage.length === barcodes.length) {
            if (cb) { cb(foodStorage); }
          }
        });
      }
    },

    getNext: function (cb) {
      console.log(foodData);
      cb(foodStorage[0]);
      var number = Math.floor(Math.random() * 10); //change 10 to length of foodStorage
      // console.log(number);
    }

  };
});
