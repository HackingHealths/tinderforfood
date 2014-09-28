angular.module('starter.directives', [])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.bind('load', function() {
        $scope.$apply($attrs.imageonload);
      });
    }
  };
});