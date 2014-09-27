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
  // console.log(foodData);
  var foodNameArray = Object.keys(foodData.foods);
  var categoryArray = ['Energy', 'Protein', 'Calcium', 'Fat', 'Carbohydrate'];
  
  
  (function () {
    for (var key in foodData.foods) {
      var array = Object.keys(foodData.foods[key]);
      for (var i = 0; i < categoryArray.length; i++) {
        if (array.indexOf(categoryArray[i]) === -1) {
          console.log('fuck! ', key, categoryArray[i]);
        }
      }
    }
  })();

  var randomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };

  var compare = function (food, category) {
    console.log(foodData);
    console.log(food, category);
    var answer = foodData.foods[food][category].value_per_hundred > foodData.averages[category] ? true : false;
    console.log(foodData.foods[food][category].value_per_hundred, foodData.averages[category], answer);
    return answer;
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
