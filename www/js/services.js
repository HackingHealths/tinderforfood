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

.factory('foodSvc', function() {
  // Might use a resource here that returns a JSON array

  var foodNameArray = Object.keys(foodData.foods);
  var categoryArray = ['Energy', 'Protein', 'Fiber', 'Sugars', 'Calcium'];
  
  console.log(foodNameArray);
  console.log(categoryArray);
  
  var randomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };

  var compare = function (foodOne, foodTwo, category) {
    return false;
  };
 
  var createSet = function () {
    var food = foodNameArray[randomNumber(foodNameArray.length)];
    var category = categoryArray[randomNumber(5)];
    var barcode = foodData.foods[food].barcode;
    var answer = compare(food, category);
    return {
      foodName: food,
      category: category,
      barcode: barcode,
      answer: answer
    };
  };

  return {
    getNext: function (cb) {
      var set = createSet();

      cb(set);
    }

  };
});
